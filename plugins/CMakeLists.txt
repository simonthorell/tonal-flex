cmake_minimum_required(VERSION 3.22.1)

project(tonal_flex_plugins)

set(CMAKE_CXX_STANDARD 20) # Latest C++ standard JUCE support
set(LIB_DIR ${CMAKE_CURRENT_SOURCE_DIR}/libs) # Holds CPM & JUCE libs

# Download CPM package manager
include(cmake/cpm.cmake) 

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
add_subdirectory(plugin-template) # Add plugin dirs here...
add_subdirectory(test)
