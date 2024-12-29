# Elk Pi OS - SD Card Image

This folder provides tools and instructions to download and flash the Elk Pi image (v1.0.0) onto an SD card.

---

## Downloading the OS Image

- **Option A**: Run `download_image.sh` on Linux/macOS.

```shell
chmod +x ./elk-os/elk-pi/scripts/download_image.sh
./elk-os/elk-pi/scripts/download_image.sh
```

- **Option B**: Manually download from [Elk Pi Releases](https://github.com/elk-audio/elk-pi/releases/tag/1.0.0).

---

## Flashing the Image

### Cross-Platform (Recommended)

Use [Balena Etcher](https://www.balena.io/etcher/):

1. Install Balena Etcher.
2. Select the downloaded `.img.xz` file.
3. Select your SD card.
4. Click "Flash".

### Linux CLI

1. `chmod +x ./elk-os/elk-pi/scripts/flash_linux.sh`
2. `./elk-os/elk-pi/scripts/flash_linux.sh /dev/sdX`

### macOS CLI

1. `chmod +x ./elk-os/elk-pi/scripts/flash_mac.sh`
2. `diskutil unmountDisk /dev/diskX`
3. `./elk-os/elk-pi/scripts/flash_mac.sh /dev/diskX`

### Windows

Use [Win32 Disk Imager](https://sourceforge.net/projects/win32diskimager/) or [Rufus](https://rufus.ie/) to flash the `.img` file.

## Warnings

- **Check the SD card device name carefully** before flashing. You can wipe your entire system disk if you choose the wrong device.
- If you run into permissions issues, prepend `sudo` (Linux/macOS) or run as Administrator (Windows).

---

## Access RaspberryPi 4B via SSH

1. Insert the flashed SD-Card to the RPi4b.
2. Connect the RPi4b to power and to your switch/router via ethernet cable.
3. Open a terminal on any computer in the network.

```shell
ssh mind@elk-pi.local

# In case it does not work, find out
# the IP-address of the RPi4b and run:
ssh mind@<RPI-IP-ADDRESS>
```

**Username:** `mind`  
**Password:** `elk`

### Flash Plugins to Elk RPi4b

```shell
scp -r /path/to/local/file mind@<IP_ADDRESS>:~/destination_folder/

# Examples:
cd <PLUGIN-DIR>
scp -r TonalFlexReverb.vst3 mind@elk-pi.local:~/plugins/
scp tonalflex_reverb.json mind@elk-pi.local:~/config_files/
```

### Test Plugins

```shell
$ sushi -r --multicore-processing=2 -c ~/config_files/tonalflex_reverb.json &
```

_Note the & at the end - this means the process starts in the background. When you later need to stop it, you type $ pkill sushi._

### Links:

- [ELK RaspberryPi Docs](https://elk-audio.github.io/elk-docs/html/intro/getting_started_with_raspberry.html)
- [Run ELK on Boards](https://elk-audio.github.io/elk-docs/html/intro/run_elk_on_boards.html#)

---
