#!/usr/bin/env bash
set -e

# Color codes
BOLD_GREEN="\033[1;32m"
RESET="\033[0m"

echo -e "${BOLD_GREEN}Starting Elk RaspberryPi4 image download script...${RESET}\n"

# Download to the rpi-image directory
cd "$(dirname "$0")"
cd ../rpi-image

# Where to save the image
IMAGE_NAME="elk-pi-image-v1.0.0.wic.bz2"
DOWNLOAD_URL="https://github.com/elk-audio/elk-pi/releases/download/1.0.0/elkpi-audio-os-image-raspberrypi4-64-v1.0.0.wic.bz2"

# Check if file already exists
if [[ -f "$IMAGE_NAME" ]]; then
  echo "Image $IMAGE_NAME already exists, skipping download."
  exit 0
fi

echo -e "Downloading Elk Pi image from:\n$DOWNLOAD_URL ...\n"
curl -L -o "$IMAGE_NAME" "$DOWNLOAD_URL"  # or wget if you prefer
echo -e "\n${BOLD_GREEN}Download complete.${RESET}\n"
