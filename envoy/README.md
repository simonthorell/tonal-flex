# Enovy Proxy

## Run locally with docker

```sh
cd envoy
docker-compose up
```

## Flash envoy binary to device

```sh
chmod +x envoy/scripts/* && cd envoy/scripts
./download-bin.sh
./flash-envoy.sh
```

On the device, run the binary:

```sh
./envoy/envoy -c envoy.yaml
```

## Links

- https://github.com/envoyproxy/envoy/releases
