# Plugin Development with JUCE C++ and ElkOS Sushi

## Create & Build VST3 Plugin (MacOS)

### Testing

```shell
cd plugins
# cmake -S . -B build
cmake -B build -S . -DBUILD_DESKTOP=ON
cmake --build build
cd build/plugin-template/AudioPlugin_artefacts/Release/Standalone/
# cd build/plugin-template/AudioPlugin_artefacts/Release/Standalone/
# cd build/plugin-template/AudioPlugin_artefacts/Debug/Standalone/
# chmod +x plugin-template.app/Contents/MacOS/* # IF NEEDED!
open ./plugin-template.app
```

### Build & Test VST3 Plugin (MacOS)

```shell
cd plugins
cmake -S . -B build

# For building or testing use the CMake presets
cmake --build build
cmake --preset default # uses Ninja build system

# Run GoogleTests
ctest --preset default
```

Building Release:

```shell
# NOT REQUIRED DURING DEVELOPMENT!
cmake -B build -DCMAKE_BUILD_TYPE=Release

# Build for Release:
cmake --build build --config Release
```

### Run VST3 Plugin (MacOS)

```shell
# Example for running plugin-template on MacOS Standalone
cd build/plugin-template/AudioPlugin_artefacts/Debug/Standalone/
cd build/plugin-template/AudioPlugin_artefacts/Release/Standalone/

chmod +x plugin-template.app/Contents/MacOS/*
open ./plugin-template.app
```

## Compile and Run in Elk SUSHI

_TODO..._
