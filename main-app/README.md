## Build container on Linux_x86

Build container
```bash
docker compose build
```

Run container
```bash
docker compose up
```

---

## Build container on MAC - not tested!

Build container
```bash
PLATFORM=mac docker compose build
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