#!/usr/bin/env bash
set -e

# Move to the image directory
cd "$(dirname "$0")"
cd ../rpi-image

IMAGE_NAME="elk-pi-image-v1.0.0.img.xz"
DEVICE="$1"

if [[ -z "$DEVICE" ]]; then
  echo "Usage: $0 /dev/sdX"
  exit 1
fi

echo "Flashing $IMAGE_NAME to $DEVICE ..."

# Uncompress the image (xzcat)
xzcat "$IMAGE_NAME" | sudo dd of="$DEVICE" bs=4M conv=fsync status=progress
sync

echo "Done! Image flashed to $DEVICE"
