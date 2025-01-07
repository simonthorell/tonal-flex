#!/usr/bin/env bash
set -e

# Move to the image directory
cd "$(dirname "$0")"
cd ../rpi-image

IMAGE_NAME="elk-pi-image-v1.0.0.wic.bz2"
DEVICE="$1"

if [[ -z "$DEVICE" ]]; then
  echo "Usage: $0 /dev/sdX"
  echo "WARNING: Make sure you have unmounted the SD card partitions first!"
  exit 1
fi

echo "Flashing $IMAGE_NAME to $DEVICE ..."

bzcat "$IMAGE_NAME" | sudo dd of="$DEVICE" bs=4M status=progress

echo "Finalizing the write process (syncing data to SD card). This may take a few minutes..."

sync

echo "Done! Image flashed to $DEVICE"
