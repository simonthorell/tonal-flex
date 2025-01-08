#!/usr/bin/env bash
set -e

# Color codes
BOLD_GREEN="\033[1;32m"
RESET="\033[0m"

# Version to download
VERSION="1.32.3"
IMAGE_NAME="envoy-${VERSION}-linux-aarch_64"
DOWNLOAD_URL="https://github.com/envoyproxy/envoy/releases/download/v${VERSION}/${IMAGE_NAME}"

echo -e "${BOLD_GREEN}Starting Envoy v${VERSION} linux aarch64 binary download script...${RESET}\n"

# Navigate to the bin directory
cd "$(dirname "$0")"
cd ../bin

# Check if file already exists
if [[ -f "$IMAGE_NAME" ]]; then
  echo "Binary $IMAGE_NAME already exists, skipping download."
  exit 0
fi

# Download the binary
echo -e "Downloading Envoy v${VERSION} linux aarch64 binary from:\n$DOWNLOAD_URL ...\n"
curl -L -o "$IMAGE_NAME" "$DOWNLOAD_URL"
echo -e "\n${BOLD_GREEN}Download complete.${RESET}\n"
