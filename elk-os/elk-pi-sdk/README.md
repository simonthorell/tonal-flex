## Build JUCE C++ Audio Plugin for ElkOS

## Quick Start

```shell
docker image build --platform linux/amd64 -t elk-audio-os-builder .
sudo docker run --platform linux/amd64 --name elk-audio-os -dit --rm elk-audio-os-builder
sudo docker attach elk-audio-os
```

```shell
docker image build -t elk-audio-os-builder .
docker-compose up elk-pi-sdk
docker exec -it elk-pi-sdk /bin/bash
```

## Setup

Configure and install the docker image on your system

```
docker image build -t elk-audio-os-builder .
```

(if you're running Docker Desktop on a Silicon Mx Mac, add the option `--platform linux/amd64` after build).

Run the container

```
sudo docker run --name elk-audio-os -dit --rm elk-audio-os-builder
sudo docker attach elk-audio-os
```

You only need sudo with Docker engine on Linux, but not on Docker Desktop for Mac/Windows.

If you're on Apple Silicon, you need again to pass the option `--platform linux/amd64` to the docker run command.

### Compile the JUCE AudioPlugin example

Inside the home directory of the container, there is a modified version of JUCE's CMake example for AudioPlugins pre-configured for this system.

You can test it with

```shell
cd ~/examples/AudioPlugin
mkdir -p build && cd build
source /SDKs/elkpi/environment-setup-cortexa72-elk-linux
cmake -DCMAKE_BUILD_TYPE=Release ..
# make -j`nproc`
make -j1
# TODO: Figure out why linking fail with -j2, -j4 etc...
```

If this is throwing errors, try:

```shell
cd ~/examples/AudioPlugin
mkdir -p build && cd build
source /SDKs/elkpi/environment-setup-cortexa72-elk-linux

# Turn off LTO & unset jobserver flags
unset MAKEFLAGS
cmake \
  -DCMAKE_INTERPROCEDURAL_OPTIMIZATION=OFF \
  -DCMAKE_BUILD_TYPE=Release \
  ..
make -j1
```

OR:

```shell
unset MAKEFLAGS  # (See next section)
cmake \
  -DCMAKE_C_FLAGS="-fno-lto" \
  -DCMAKE_CXX_FLAGS="-fno-lto" \
  -DCMAKE_EXE_LINKER_FLAGS="-fno-lto" \
  -DCMAKE_MODULE_LINKER_FLAGS="-fno-lto" \
  -DCMAKE_SHARED_LINKER_FLAGS="-fno-lto" \
  -DCMAKE_BUILD_TYPE=Release \
  ..
make -j1
# TODO: Figure out why linking fail with -j2, -j4 etc...
```
