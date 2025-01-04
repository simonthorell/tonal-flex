# Use a base image with build tools
FROM ubuntu:latest AS builder

# Build-time argument for platform selection (default: linux_x86)
ARG PLATFORM=linux_x86

# Set a faster Ubuntu mirror
RUN sed -i 's|http://archive.ubuntu.com/ubuntu/|http://mirror.math.princeton.edu/pub/ubuntu/|g' /etc/apt/sources.list

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

# Install gRPC and Protobuf
RUN git clone --recurse-submodules -b v1.57.0 https://github.com/grpc/grpc.git /grpc && \
    mkdir -p /grpc/cmake/build && \
    cd /grpc/cmake/build && \
    cmake ../.. \
        -DgRPC_INSTALL=ON \
        -DgRPC_BUILD_TESTS=OFF \
        -DCMAKE_BUILD_TYPE=Release \
        -DCMAKE_INSTALL_PREFIX=/usr/local && \
    make -j$(nproc) && make install && ldconfig

# Set the working directory for your app
WORKDIR /app

# Copy the source code
COPY . .

# Build your application
RUN mkdir -p build && cd build && \
    cmake -DCMAKE_PREFIX_PATH="/usr/local/lib/cmake" -DPLATFORM=${PLATFORM} .. && \
    make -j$(nproc)

# Final runtime image
FROM ubuntu:latest

# Set a faster Ubuntu mirror for runtime
RUN sed -i 's|http://archive.ubuntu.com/ubuntu/|http://mirror.math.princeton.edu/pub/ubuntu/|g' /etc/apt/sources.list

# Install runtime dependencies
RUN apt-get update && apt-get install -y \
    libprotobuf-dev \
    libssl-dev \
    libjack-jackd2-0 \
    jackd2 \
    alsa-utils \
    libfuse2 \
    libboost-filesystem-dev \
    libboost-program-options-dev \
    libboost-system-dev \
    && apt-get clean

# Set the working directory
WORKDIR /app

# Copy the compiled app from the builder stage
COPY --from=builder /app/build/main_app /app/main_app
COPY config /app/config
COPY plugins /app/plugins
COPY proto /app/proto
COPY logs /app/logs
COPY sushi/Sushi-x86_64.AppImage /app/sushi/Sushi-x86_64.AppImage

# Set permissions for the Sushi AppImage
RUN chmod +x /app/sushi/Sushi-x86_64.AppImage

# Expose the gRPC server port
EXPOSE 50051 51051

# Default command
CMD ["/app/main_app"]
