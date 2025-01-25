# X-compile envoy without tcMalloc using docker in docker with Qemu for aarch64

## 0. Qemu Kernerl bug workaround for arm64/aarch64(run this before building the container if you get libc-bin error)

```bash

docker run --rm --privileged multiarch/qemu-user-static --reset -p yes -c yes

```
...

## 1. Build Continer.

```bash

docker buildx build --platform linux/arm64 -t envoy-aarch64 .

```
...

## 2. Run container.

```bash

docker run --rm -it -v /var/run/docker.sock:/var/run/docker.sock envoy-aarch64

```
...

## 3. Set permission for shell script files.

```bash

chmod +x ./ci/run_envoy_docker.sh ./ci/do_ci.sh

```
...

## 4. (Inside container) Build docker container

```bash
./ci/run_envoy_docker.sh './ci/do_ci.sh release.server_only'
# ./ci/run_envoy_docker.sh

```
...

## 5. (Inside container) Change user before next script

```bash
su - envoyuser
```
...

## 6. (Inside container) Move back to source folder

```bash
cd /source
```
...

## 7. (Inside container) Run Bazel build script to build envoy

```bash

./ci/do_ci.sh release.server_only

´´´
...

## TODO's

export PATH=$PATH:/usr/lib/llvm-14/bin
