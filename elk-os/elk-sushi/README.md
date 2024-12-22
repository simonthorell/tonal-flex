# ElkOS Sushi

## Install & Run ElkOS Sushi

### Install ElkOS Sushi

Linux X86:

```shell
chmod +x ./elk-os/elk-sushi/scripts/install_linux_x86.sh
./elk-os/elk-sushi/scripts/install_linux_x86.sh
```

MacOS ARM64 (Silicon):

```shell
chmod +x ./elk-os/elk-sushi/scripts/install_mac_arm64.sh
./elk-os/elk-sushi/scripts/install_mac_arm64.sh
```

MacOS X86 (Intel):

```shell
chmod +x ./elk-os/elk-sushi/scripts/install_mac_x86.sh
./elk-os/elk-sushi/scripts/install_mac_x86.sh
```

### Test Run ElkOS Sushi

```shell
cd ./elk-os/elk-sushi/sushi

# Here are some tests to make sure it works:
./sushi --coreaudio -c config_files/play_brickworks_synth.json
./sushi --coreaudio -c config_files/play_vst3.json
```

### Sushi Links:

- [Running a plugin within the Sushi host](https://elk-audio.github.io/elk-docs/html/intro/getting_started_with_development_kit_software.html)
