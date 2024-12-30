## To build container on Linux_x86

Build container
```bash
docker compose build
```

Run container
```bash
docker compose up
```

---

## To build container on MAC_amr64 - not tested!

Build container
```bash
PLATFORM=mac_arm64 docker compose build
```

Run container
```bash
docker compose up
```

---

## Rebuild proto files from main_app.proto

use command to create proto files for cpp:
```bash
protoc -I=proto --cpp_out=proto proto/main_app.proto
protoc -I=proto --grpc_out=proto --plugin=protoc-gen-grpc=`which grpc_cpp_plugin` proto/main_app.proto
```
---

## Build docker image

```bash
docker build -t main_app_image .
```
---

## Run Container

```bash
docker run --rm -it \
    -p 8080:8080 \
    --device /dev/snd \
    --group-add audio \
    main_app_image
```

---

# Ensure the container has the audio group
RUN groupadd -g 29 audio && usermod -aG audio root

```
 docker system prune -a
```