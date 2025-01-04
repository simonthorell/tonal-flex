#!/bin/bash

# Stop all running Sushi processes
killall Sushi-x86_64.AppImage 2>/dev/null # maybe change to: killall sushi

if [ $? -eq 0 ]; then
  echo "Sushi stopped successfully."
else
  echo "No Sushi process was running."
fi
