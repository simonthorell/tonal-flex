#!/usr/bin/env bash
set -e

# This script copies the run.sh script to the device
# running the TonalFlex system.

# Load the .env file
if [ -f ../../.env ]; then
    export $(grep -v '^#' ../../.env | xargs)
else
    echo ".env file not found. Exiting."
    exit 1
fi

# Check if REMOTE_IP is set
if [ -z "DEVICE_IP" ]; then
    echo "DEVICE_IP variable is not set in the .env file. Exiting."
    exit 1
fi

# Use the IP variable from the .env file
echo "Using IP: $DEVICE_IP"
scp run.sh mind@"$DEVICE_IP":~/
