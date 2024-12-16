#!/bin/bash

# Set the JUCE path
export JUCE_DIR=/juce

# Iterate over all directories in /plugins that do not start with "."
for dir in /plugins/*/; do
    dirname=$(basename "$dir")
    
    # Skip directories starting with "."
    if [[ "$dirname" =~ ^\. ]]; then
        continue
    fi

    echo "Building plugin in directory: $dirname"
    
    # Check for a .jucer file
    jucer_file=$(find "$dir" -maxdepth 1 -name "*.jucer" | head -n 1)
    if [[ -f "$jucer_file" ]]; then
        echo "Found .jucer file: $jucer_file"

        # Resave the .jucer file to generate the Makefile
        /juce/extras/Projucer/Builds/LinuxMakefile/build/Projucer --resave "$jucer_file"
    fi

    # Check for a Linux Makefile build directory
    makefile_dir="$dir/Builds/LinuxMakefile"
    if [[ -d "$makefile_dir" && -f "$makefile_dir/Makefile" ]]; then
        echo "Building plugin in $makefile_dir"
        
        # Navigate to the Makefile directory and build
        cd "$makefile_dir"
        make CONFIG=Release
    else
        echo "No valid Makefile found for $dirname, skipping..."
    fi
done

echo "Build process completed!"
