# Cross-Compile for Aarch64 Linux

```sh
cd core
docker build -t xcompiler -f x-compile/Dockerfile .
docker run --name xcompiler -dit xcompiler /bin/bash
docker exec -it xcompiler /bin/bash

# Check file format of compiled ELF binary
readelf -h main_app
```

Copy the binary from container

```sh
docker cp xcompiler:/app/main_app ./main_app
```

Copy the binary to device running ElkOS:

```sh
scp -r core/main_app mind@192.168.50.198:~/
scp -r core/x-compile/bin/main_app mind@192.168.50.198:~/
```
