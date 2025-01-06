FROM ubuntu:22.04 AS builder

ARG PLATFORM=linux_arm64

# Install necessary tools and dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    cmake \
    git \
    curl \
    libssl-dev \
    zlib1g-dev \
    pkg-config \
    libprotobuf-dev \
    protobuf-compiler \
    libfuse2 \
    libboost-filesystem-dev \
    libboost-program-options-dev \
    libboost-system-dev \
    && apt-get clean

# Copy the source code
WORKDIR /app
COPY . .

# Install gRPC and Protobuf
RUN mkdir -p /app/x-compile/grpc/cmake/build && \
    cd /app/x-compile/grpc/cmake/build && \
    cmake ../.. \
    -DgRPC_INSTALL=ON \
    -DgRPC_BUILD_TESTS=OFF \
    -DCMAKE_BUILD_TYPE=Release \
    -DPLATFORM=${PLATFORM} \
    -DCMAKE_C_COMPILER=/usr/bin/aarch64-linux-gnu-gcc \
    -DCMAKE_CXX_COMPILER=/usr/bin/aarch64-linux-gnu-g++ \
    -DCMAKE_INSTALL_PREFIX=/usr/local && \
    make -j$(nproc) && make install && ldconfig

# Build your application (outputs binary to /app)
RUN cmake -DCMAKE_PREFIX_PATH="/usr/local/lib/cmake" -DPLATFORM=${PLATFORM} /app && \
    make -j$(nproc)
