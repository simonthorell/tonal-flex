cmake_minimum_required(VERSION 3.22.1)

project(TonalFlexReverb VERSION 0.0.1) # Required by JUCE

set(INCLUDE_DIR "${CMAKE_CURRENT_SOURCE_DIR}/include/plugin-reverb")

option(BUILD_DESKTOP "Also build Standalone" OFF) # cmake -B build -S . -DBUILD_DESKTOP=ON
set(_plugin_formats "VST3") # Default plugin formats

if (BUILD_DESKTOP)
    # Add Standalone format for desktop test builds
    list(APPEND _plugin_formats "Standalone")
    set(VST3_MANIFEST TRUE) # Create moduleinfo.json for VST3
else()
    # Rely on installed JUCE inside x-compiler container
    find_package(JUCE CONFIG REQUIRED)
    # Disable LTO (Link-Time Optimization)
    set(CMAKE_INTERPROCEDURAL_OPTIMIZATION OFF)
    # Disable VST3_AUTO_MANIFEST (Required for ElkOS cross-compilation)
    set(VST3_MANIFEST FALSE) 
endif()

juce_add_plugin(${PROJECT_NAME}
    COMPANY_NAME TonalFlex
    PLUGIN_NAME "TonalFlexReverb"
    IS_SYNTH FALSE
    NEEDS_MIDI_INPUT FALSE
    NEEDS_MIDI_OUTPUT FALSE
    PLUGIN_MANUFACTURER_CODE MCMP
    PLUGIN_CODE EXPL
    FORMATS ${_plugin_formats}
    PRODUCT_NAME "TonalFlexReverb"
    VST3_AUTO_MANIFEST ${VST3_MANIFEST}
)

target_sources(${PROJECT_NAME}
    PRIVATE
        src/plugin_editor.cpp
        src/plugin_processor.cpp
        ${INCLUDE_DIR}/plugin_editor.h
        ${INCLUDE_DIR}/plugin_processor.h
)

target_include_directories(${PROJECT_NAME}
    PUBLIC
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# JUCE modules used
target_link_libraries(${PROJECT_NAME}
    PRIVATE
        juce::juce_audio_utils
        juce::juce_audio_devices

        # Additional modules
        juce::juce_audio_processors
        juce::juce_dsp
        juce::juce_gui_basics

    PUBLIC
        juce::juce_recommended_config_flags
        juce::juce_recommended_lto_flags
        juce::juce_recommended_warning_flags
)

# These definitions are recommended by JUCE.
target_compile_definitions(${PROJECT_NAME}
    PUBLIC
        JUCE_WEB_BROWSER=0
        JUCE_USE_CURL=0
        JUCE_VST3_CAN_REPLACE_VST2=0
)

# Treat all warnings as errors
if (MSVC)
    target_compile_options(${PROJECT_NAME} PRIVATE /W4 /WX)
else()
    target_compile_options(${PROJECT_NAME} PRIVATE -Wall -Wextra -Wpedantic)
endif()

source_group(TREE ${CMAKE_CURRENT_SOURCE_DIR}/..) # Visual Studio Only
