# Cross-Compile for Aarch64 Linux

```shell
cd main-app/x-compile/
git clone --recurse-submodules -b v1.57.0 https://github.com/grpc/grpc.git
```

```shell
docker build -t my-aarch64-builder -f main-app/x-compile/Dockerfile .

docker create --name extract-container my-aarch64-builder
docker cp extract-container:/app/build/main_app ./main_app_aarch64
docker rm extract-container
```
