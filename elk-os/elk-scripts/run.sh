#!/usr/bin/env bash
set -e

# This script is intended to be run on the device running the TonalFlex system.
#
# It starts the TonalFlex Core and connects all MIDI devices to the Sushi client.
# It also monitors the Sushi client and reconnects MIDI devices if the client disconnects.

# This ensures all background main.py processes are killed when the script exit
function cleanup {
    echo "Cleaning up... Stopping TonalFlex Core."
    pkill -f "python3 core/main.py" || true
}

trap cleanup EXIT # Set up a trap to ensure cleanup is always executed

echo "Starting the TonalFlex Core..."
python3 core/main.py &  # Run in the background
CORE_PID=$!
echo "Core started with PID: $CORE_PID"

function check_sushi_client {
    aconnect -l | grep -q "client 128: 'Sushi'"
}

function connect_midi_devices {
    echo "Fetching external MIDI devices..."
    midi_devices=$(aconnect -l | grep "card=" | awk -F" " '{print $2}' | tr -d ":")

    sleep 2  # Wait for Sushi to load

    for device in $midi_devices; do
        echo "Connecting MIDI device $device to Sushi (128:0)..."
        aconnect "$device:0" 128:0
    done
    echo "All MIDI devices are connected to Sushi!"
}

# Main loop
while kill -0 "$CORE_PID" 2>/dev/null; do
    echo "Monitoring Sushi client..."
    
    while ! check_sushi_client; do
        echo "Waiting for Sushi client to become available..."
        sleep 1
    done

    echo "Sushi client is available!"
    connect_midi_devices

    while check_sushi_client; do
        sleep 1
    done

    echo "Sushi client disconnected! Reattempting connection..."
done

echo "TonalFlex Core has stopped unexpectedly!"
exit 1
