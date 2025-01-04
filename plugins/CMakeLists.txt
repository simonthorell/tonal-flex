cmake_minimum_required(VERSION 3.22.1)

project(tonal_flex_plugins)

set(CMAKE_CXX_STANDARD 20) # Latest C++ standard JUCE support
set(LIB_DIR ${CMAKE_CURRENT_SOURCE_DIR}/libs) # Holds CPM & JUCE libs

# Download CPM package manager
include(cmake/cpm.cmake) 

# Linux-specific dependencies
if (UNIX)
    if (CMAKE_SYSTEM_PROCESSOR STREQUAL "x86_64")
        message(STATUS "Configuring for Linux x86_64")

        # Find or install missing packages
        find_package(PkgConfig REQUIRED)

        # Helper macro to check and install packages
        macro(ensure_pkg_dependency NAME PKG DEV_PKG)
            pkg_check_modules(${NAME} QUIET ${PKG})
            if (NOT ${NAME}_FOUND)
                message(WARNING "${PKG} not found. Attempting to install ${DEV_PKG}...")
                execute_process(
                    COMMAND sudo apt-get install -y ${DEV_PKG}
                    RESULT_VARIABLE result
                )
                if (result)
                    message(FATAL_ERROR "Failed to install ${DEV_PKG}.")
                else()
                    message(STATUS "${DEV_PKG} installed successfully.")
                    pkg_check_modules(${NAME} REQUIRED ${PKG})
                endif()
            endif()
        endmacro()

        # Ensure each package is available
        ensure_pkg_dependency(ALSA alsa libasound2-dev)
        ensure_pkg_dependency(FREETYPE freetype2 libfreetype6-dev)
        ensure_pkg_dependency(FONTCONFIG fontconfig libfontconfig1-dev)
        ensure_pkg_dependency(GL gl libgl1-mesa-dev)
        ensure_pkg_dependency(CURL libcurl libcurl4-openssl-dev)
        ensure_pkg_dependency(WEBKIT webkit2gtk-4.1 libwebkit2gtk-4.1-dev)
        ensure_pkg_dependency(X11 x11 libx11-dev)

        # Set variables for library includes and linking
        set(LINUX_INCLUDE_DIRS
            /usr/include/freetype2
            ${ALSA_INCLUDE_DIRS}
            ${X11_INCLUDE_DIRS}
            ${CURL_INCLUDE_DIRS}
            ${FREETYPE_INCLUDE_DIRS}
            ${FONTCONFIG_INCLUDE_DIRS}
            ${GL_INCLUDE_DIRS}
            ${WEBKIT_INCLUDE_DIRS}
        )

        set(LINUX_LIBRARY_DIRS
            ${ALSA_LIBRARY_DIRS}
            ${X11_LIBRARY_DIRS}
            ${CURL_LIBRARY_DIRS}
            ${FREETYPE_LIBRARY_DIRS}
            ${FONTCONFIG_LIBRARY_DIRS}
            ${GL_LIBRARY_DIRS}
            ${WEBKIT_LIBRARY_DIRS}
        )

        set(LINUX_LIBRARIES
            ${ALSA_LIBRARIES}
            ${X11_LIBRARIES}
            ${CURL_LIBRARIES}
            ${FREETYPE_LIBRARIES}
            ${FONTCONFIG_LIBRARIES}
            ${GL_LIBRARIES}
            ${WEBKIT_LIBRARIES}
        )
    else()
        message(STATUS "Skipping x86_64-specific configuration for architecture: ${CMAKE_SYSTEM_PROCESSOR}")
    endif()
endif()

# Download JUCE using CPM
CPMAddPackage(
    NAME JUCE
    GIT_TAG 8.0.2
    VERSION 8.0.2
    GITHUB_REPOSITORY juce-framework/JUCE
    SOURCE_DIR ${LIB_DIR}/juce
)

# Download GoogleTest Framework using CPM
CPMAddPackage(
    NAME GOOGLETEST
    GITHUB_REPOSITORY google/googletest
    GIT_TAG v1.15.2
    VERSION 1.15.2
    SOURCE_DIR ${LIB_DIR}/googletest
    OPTIONS
        "INSTALL_GTEST OFF"
        "gtest_force_shared_crt ON"
)

enable_testing() # Allow running build tests

# Add Subdirectories
add_subdirectory(plugin-reverb)
# add_subdirectory(plugin-template) 
# add_subdirectory(test)