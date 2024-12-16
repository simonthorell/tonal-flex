# Use a base image with build essentials
FROM ubuntu:22.04

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    cmake \
    git \
    pkg-config \
    wget \
    libasound2-dev \
    libjack-jackd2-dev \
    libx11-dev \
    libxinerama-dev \
    libfreetype6-dev \
    libxrandr-dev \
    libxcursor-dev \
    libgl1-mesa-dev \
    python3 \
    python3-pip \
    zip \
    unzip \
    && apt-get clean

# Install cross-compilation toolchain (ElkOS/ARM)
RUN apt-get update && apt-get install -y \
    gcc-arm-linux-gnueabihf \
    g++-arm-linux-gnueabihf

# Set up JUCE
WORKDIR /juce
RUN git clone --depth 1 https://github.com/juce-framework/JUCE.git .

# Install Projucer dependencies
RUN apt-get install -y \
    libwebkit2gtk-4.0-dev \
    libcurl4-openssl-dev

# Build Projucer (optional, for generating projects)
RUN cd extras/Projucer/Builds/LinuxMakefile && make CONFIG=Release

# Add JUCE to PATH
ENV JUCE_DIR=/juce

# Set up a working directory for your plugins
WORKDIR /plugins

# Copy the local plugins folder into the container
COPY . .

# Add the build script
COPY build-plugins.sh /usr/local/bin/build-plugins.sh
RUN chmod +x /usr/local/bin/build-plugins.sh

# Default command for building plugins
CMD ["/usr/local/bin/build-plugins.sh"]
