#!/usr/bin/env bash
set -e

# Move to the image directory
cd "$(dirname "$0")"
cd ../rpi-image

IMAGE_NAME="elk-pi-image-v1.0.0.img.xz"
DEVICE="$1"

if [[ -z "$DEVICE" ]]; then
  echo "Usage: $0 /dev/diskX"
  echo "WARNING: Make sure you have unmounted the SD card partitions first!"
  exit 1
fi

echo "Flashing $IMAGE_NAME to $DEVICE ..."

xzcat "$IMAGE_NAME" | sudo dd of="$DEVICE" bs=4m
sync

echo "Done! Image flashed to $DEVICE"
