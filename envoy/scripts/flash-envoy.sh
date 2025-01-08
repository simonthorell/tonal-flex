#!/usr/bin/env bash
set -e

BOLD_GREEN="\033[1;32m"
RESET="\033[0m"

TARGET_USER="mind"
TARGET_IP="192.168.50.198"
TMP_DIR="/tmp/envoy-flash"

echo -e "${BOLD_GREEN}Preparing temporary directory...${RESET}\n"

# Put the files to flash in a temporary directory
mkdir -p "$TMP_DIR"
cp ../bin/envoy "$TMP_DIR/"
cp ../envoy.yaml "$TMP_DIR/"

echo -e "${BOLD_GREEN}Flashing envoy to device with IP ${TARGET_IP}...${RESET}\n"

# Transfer the temporary directory to the target
scp -r "$TMP_DIR" "$TARGET_USER@$TARGET_IP:~/envoy"
echo -e "\n${BOLD_GREEN}Flashing complete. Files are in /envoy on the target.${RESET}\n"

# Clean up the temporary directory locally
rm -rf "$TMP_DIR"
