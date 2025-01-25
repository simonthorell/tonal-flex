#!/usr/bin/env bash
set -e

BOLD_GREEN="\033[1;32m"
RESET="\033[0m"

TARGET_USER="mind"
TARGET_IP="192.168.132.108"
REMOTE_DIR="~/envoy"

echo -e "${BOLD_GREEN}Updating envoy.yaml on the device with IP ${TARGET_IP}...${RESET}\n"

# Check if envoy.yaml exists
if [[ ! -f ../envoy.yaml ]]; then
  echo "envoy.yaml not found. Ensure the file exists in the correct location."
  exit 1
fi

# Transfer envoy.yaml to the target device
scp ../envoy.yaml "$TARGET_USER@$TARGET_IP:$REMOTE_DIR/envoy.yaml" || {
  echo "Failed to transfer envoy.yaml to $TARGET_IP. Please check the connection."
  exit 1
}

echo -e "\n${BOLD_GREEN}Update complete. envoy.yaml has been updated on the target device.${RESET}\n"
