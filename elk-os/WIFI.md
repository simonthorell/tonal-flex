# Setup WiFI on ElkOS Device

Run connmanctl to connect to WiFi:

```shell
sudo connmanctl
```

Now you should see a `connmanctl>` shell:

```shell
agent on
scan wifi
services

# Replace with wifi network from the displayed list
connect wifi_xxx
```

Close `connmanctl>` shell with `CTRL+D`.

```shell
# Confirm assigned IP address for wlan0
ifconfig wlan0
```

### Links:

- [Elk Audio Documentation - Working with Elk Board](https://elk-audio.github.io/elk-docs/html/embedded/working_with_elk_board.html)
