# TonalFlex Main App

---

## Copy Core to device over SSH

```sh
# Replace with actual IP of device on your network
scp -r core/ mind@<IP-ADDRESS>:~/
```

Password is `elk`.

---

## Run Core App

On the device running elkOS, run:

```sh
cd core
sushi --dummy --multicore-processing=2 -c ~/core/main.json &
python3 main.py --protofile "/usr/share/sushi/sushi_rpc.proto"
```
