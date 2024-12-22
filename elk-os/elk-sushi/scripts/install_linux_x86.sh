#!/usr/bin/env bash
set -e

# Color codes
BOLD_GREEN="\033[1;32m"
BOLD_CYAN="\033[1;36m"
RESET="\033[0m"

echo -e "${BOLD_GREEN}Starting Elk SUSHI Linux X86 download & install script...${RESET}\n"

# Move to the script’s own directory, just in case
cd "$(dirname "$0")"

# Fetch the latest version of SUSHI from the GitHub release page
SUSHI_VERSION="1.1.0"
SUSHI_URL="https://github.com/elk-audio/sushi/releases/download/${SUSHI_VERSION}/Sushi-x86_64.AppImage"
ARCHIVE_NAME="temp_sushi.zip"
DEST_DIR="../"

# Download
echo -e "${BOLD_CYAN}Downloading Elk SUSHI (macOS ARM64) from:${RESET}\n${SUSHI_URL}\n"
curl -L -o "$ARCHIVE_NAME" "$SUSHI_URL"

# Unzip
echo -e "\n${BOLD_CYAN}Unzipping into ${DEST_DIR}...${RESET}"
mkdir -p "$DEST_DIR"
unzip -q "$ARCHIVE_NAME" -d "$DEST_DIR"

# Cleanup
echo -e "\nRemoving temporary file: $ARCHIVE_NAME"
rm -f "$ARCHIVE_NAME"

echo -e "\n${BOLD_GREEN}Download & install of Elk SUSHI (Linux X86) completed successfully!${RESET}\n"