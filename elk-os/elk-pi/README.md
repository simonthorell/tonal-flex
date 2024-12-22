# Elk Pi OS - SD Card Image

This folder provides tools and instructions to download and flash the Elk Pi image (v1.0.0) onto an SD card.

## Downloading the Image

- **Option A**: Run `download_image.sh` on Linux/macOS.

```shell
chmod +x ./elk-os/elk-pi/scripts/download_image.sh
./elk-os/elk-pi/scripts/download_image.sh
```

- **Option B**: Manually download from [Elk Pi Releases](https://github.com/elk-audio/elk-pi/releases/tag/1.0.0).

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
