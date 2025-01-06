# Stage 1: Host tools (build protoc + grpc_cpp_plugin natively)
FROM ubuntu:22.04 AS host-tools

RUN apt-get update && apt-get install -y \
    build-essential cmake git libssl-dev zlib1g-dev \
    && apt-get clean

WORKDIR /grpc
COPY grpc /grpc

RUN mkdir -p cmake/build-host && \
    cd cmake/build-host && \
    cmake ../.. \
    -DgRPC_INSTALL=ON \
    -DgRPC_BUILD_TESTS=OFF \
    -DgRPC_BUILD_GRPC_CSHARP_PLUGIN=OFF \
    -DgRPC_BUILD_GRPC_NODE_PLUGIN=OFF \
    -DgRPC_BUILD_GRPC_PHP_PLUGIN=OFF \
    -DgRPC_BUILD_GRPC_OBJECTIVE_C_PLUGIN=OFF \
    -DgRPC_BUILD_GRPC_PYTHON_PLUGIN=OFF \
    -DgRPC_BUILD_GRPC_RUBY_PLUGIN=OFF \
    -DgRPC_BUILD_GRPC_REFLECTION=OFF \
    -DCMAKE_BUILD_TYPE=Release \
    -DCMAKE_INSTALL_PREFIX=/tmp/install-host \
    && \
    make -j$(nproc) && \
    make install

# protoc + grpc_cpp_plugin are in /tmp/install-host/bin

# Stage 2: Cross-compile gRPC for aarch64
FROM ubuntu:22.04 AS cross-compile

RUN dpkg --add-architecture arm64
RUN apt-get update && apt-get install -y \
    build-essential cmake git \
    gcc-aarch64-linux-gnu g++-aarch64-linux-gnu \
    libssl-dev:arm64 \
    zlib1g-dev:arm64 \
    libc-ares-dev:arm64 \
    && apt-get clean

# Copy the host-built tools into /host-tools
COPY --from=host-tools /tmp/install-host /host-tools

WORKDIR /grpc
COPY grpc /grpc

RUN mkdir -p cmake/build-cross && \
    cd cmake/build-cross && \
    cmake ../.. \
    -DgRPC_INSTALL=ON \
    -DgRPC_BUILD_TESTS=OFF \
    -DCMAKE_BUILD_TYPE=Release \
    -DCMAKE_SYSTEM_NAME=Linux \
    -DCMAKE_SYSTEM_PROCESSOR=aarch64 \
    -DCMAKE_C_COMPILER=/usr/bin/aarch64-linux-gnu-gcc \
    -DCMAKE_CXX_COMPILER=/usr/bin/aarch64-linux-gnu-g++ \
    -DCMAKE_INSTALL_PREFIX=/usr/local \
    -DProtobuf_PROTOC_EXECUTABLE=/host-tools/bin/protoc \
    -DgRPC_CPP_PLUGIN=/host-tools/bin/grpc_cpp_plugin \
    && \
    make VERBOSE=1 -j$(nproc) && \
    make install

# Stage 3: Build your application using cross-compiled gRPC
FROM cross-compile AS builder

WORKDIR /app
COPY . /app

RUN mkdir -p build && cd build && \
    cmake .. \
    -DCMAKE_PREFIX_PATH="/usr/local" \
    -DCMAKE_SYSTEM_NAME=Linux \
    -DCMAKE_SYSTEM_PROCESSOR=aarch64 \
    -DCMAKE_C_COMPILER=/usr/bin/aarch64-linux-gnu-gcc \
    -DCMAKE_CXX_COMPILER=/usr/bin/aarch64-linux-gnu-g++ \
    # IMPORTANT: point to the *host-built* protoc/grpc_cpp_plugin if generating .pb.cc files
    -DProtobuf_PROTOC_EXECUTABLE=/host-tools/bin/protoc \
    -DgRPC_CPP_PLUGIN=/host-tools/bin/grpc_cpp_plugin \
    -DCMAKE_BUILD_TYPE=Release \
    && \
    make -j$(nproc)

# At this point, your cross-compiled application binary is in /app/build