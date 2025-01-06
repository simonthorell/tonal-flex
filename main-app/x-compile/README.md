# Cross-Compile for Aarch64 Linux

```sh
cd main-app
docker build -t xcompiler -f x-compile/Dockerfile .
docker run --name xcompiler -dit xcompiler /bin/bash
docker exec -it xcompiler /bin/bash

# Check file format of compiled ELF binary
readelf -h main_app
```

```sh
# Copy Executable from container
docker cp xcompiler:/app/main_app ./main_app
```

```sh
scp -r main-app/main_app mind@192.168.50.198:~/
```
