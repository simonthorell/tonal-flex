#!/bin/bash

# Ensure the configuration file name is provided
if [ -z "$1" ]; then
  echo "Error: No configuration file provided."
  exit 1
fi

CONFIG_FILE="$1"
SUSHI_BASE_PATH="/app/sushi"

# Check if the configuration file exists
if [ ! -f "$CONFIG_FILE" ]; then
  echo "Error: Configuration file '$CONFIG_FILE' does not exist."
  exit 1
fi

# Check the PLATFORM variable and start Sushi with the correct audio server
if [ "$PLATFORM" == "linux_x86" ]; then
  echo "Starting Sushi with Jack on Linux..."
  "$SUSHI_BASE_PATH/Sushi-x86_64.AppImage" -j --connect-ports --base-plugin-path=/app/plugins -c /app/configs/play_vst3.json &
elif [ "$PLATFORM" == "mac" ]; then
  echo "Starting Sushi with CoreAudio on macOS..."
  "$SUSHI_BASE_PATH/Sushi-x86_64.AppImage" --a --connect-ports --base-plugin-path="$SUSHI_BASE_PATH" -c "$CONFIG_FILE" &
else
  echo "Error: Unsupported platform '$PLATFORM'."
  exit 1
fi

echo "Sushi started with config: $CONFIG_FILE"
