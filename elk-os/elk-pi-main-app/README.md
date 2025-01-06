## Cross compiled main app for elkOS

# Pre Build
```bash
cd elk-os/elk-pi-main-app/libs
git clone --recurse-submodules -b v1.57.0 https://github.com/grpc/grpc.git
git clone --recursive --depth 1 --branch boost-1.83.0 https://github.com/boostorg/boost.git
cd ..
```

# Build Container

```bash
docker build -t aarch64-cross-compiler .
```

# Run container

```bash
docker run --rm -v $(pwd)/output:/output aarch64-cross-compiler
```

Original main_app.proto can be found in root/main-app/proto