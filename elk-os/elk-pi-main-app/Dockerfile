# Use an Ubuntu base image
FROM ubuntu:22.04

# Install essential build tools and dependencies
RUN apt-get update && apt-get install -y \
    gcc-aarch64-linux-gnu \
    g++-aarch64-linux-gnu \
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
    bzip2 \
    && apt-get clean

# Set up the working directory
WORKDIR /app

# Copy required repositories and toolchains into the container
COPY libs/grpc /app/libs/grpc
COPY libs/toolchain-aarch64.cmake /app/libs/toolchain-aarch64.cmake
COPY libs/boost /app/libs/boost

# Build and install gRPC for C++ only
RUN mkdir -p /app/libs/grpc/build && cd /app/libs/grpc/build && \
    cmake -DCMAKE_TOOLCHAIN_FILE=/app/libs/toolchain-aarch64.cmake \
          -DCMAKE_INSTALL_PREFIX=/usr/aarch64-linux-gnu \
          -DgRPC_INSTALL=ON \
          -DgRPC_BUILD_TESTS=OFF \
          -DgRPC_BUILD_CODEGEN=OFF \
          -DgRPC_BUILD_PLUGIN=OFF \
          -DgRPC_BUILD_GRPC_CSHARP_PLUGIN=OFF \
          -DgRPC_BUILD_GRPC_PYTHON_PLUGIN=OFF \
          -DgRPC_BUILD_GRPC_RUBY_PLUGIN=OFF \
          -DgRPC_BUILD_GRPC_NODE_PLUGIN=OFF \
          -DgRPC_BUILD_GRPC_OBJECTIVE_C_PLUGIN=OFF \
          -DgRPC_BUILD_GRPC_PHP_PLUGIN=OFF \
          -DgRPC_ABSL_PROVIDER=module \
          -DgRPC_PROTOBUF_PROVIDER=module \
          -DgRPC_CARES_PROVIDER=module \
          -DgRPC_SSL_PROVIDER=module \
          -DCMAKE_CXX_FLAGS="-Wno-error -fPIC" \
          -DCMAKE_C_FLAGS="-Wno-error -fPIC" \
          .. && \
    make -j$(nproc) && \
    make install

# Build and install Boost for AArch64
RUN cd /app/libs/boost && \
    ./bootstrap.sh --prefix=/usr/aarch64-linux-gnu --with-toolset=gcc && \
    echo "using gcc : arm : aarch64-linux-gnu-g++ ;" >> project-config.jam && \
    ./b2 -j$(nproc) toolset=gcc-arm link=shared threading=multi --layout=system --with-filesystem --with-program_options --with-system \
    install

# Copy the application source code into the container
COPY . /app

# Build the application
RUN mkdir -p /app/build && cd /app/build && \
    cmake -DCMAKE_TOOLCHAIN_FILE=/app/libs/toolchain-aarch64.cmake \
          -DgRPC_DIR=/usr/aarch64-linux-gnu/lib/cmake/grpc \
          -DBOOST_ROOT=/usr/aarch64-linux-gnu \
          -DBoost_NO_SYSTEM_PATHS=ON \
          .. && \
    make -j$(nproc)

# Copy the compiled binary to the output directory
RUN mkdir -p /output && cp /app/build/main_app /output/main_app

# Define the output directory as a volume to access the binary easily
VOLUME ["/output"]

# Set the default command
CMD ["echo", "Cross-compilation completed. Retrieve your binary from /output."]
