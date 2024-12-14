# Plugin Development with JUCE C++ and ElkOS Sushi

## Install ElkOS Sushi Locally

### Download Sushi

```shell
# MacOS (ARM64)
curl -L https://github.com/elk-audio/sushi/releases/download/1.1.0/sushi-macos-arm64_1.1.0.zip -o temp_sushi.zip && unzip -q temp_sushi.zip -d plugins/.sushi && rm temp_sushi.zip

# MacOS (X86_64)
curl -L https://github.com/elk-audio/sushi/releases/download/1.1.0/sushi-macos-x86_1.1.0.zip -o temp_sushi.zip && unzip -q temp_sushi.zip -d plugins/.sushi && rm temp_sushi.zip

# Alternative download manually:
# 1. Open a browser and visit: https://github.com/elk-audio/sushi/releases/tag/1.1.0
# 2. Unzip the file
# 3. Clear quarantine using `xattr -rc sushi`
```

### Run Sushi

```shell
cd plugins/.sushi/sushi
# Here are some tests to make sure it works:
./sushi --coreaudio -c config_files/play_brickworks_synth.json
./sushi --coreaudio -c config_files/play_vst3.json
```

### Sushi Links:

- [Running a plugin within the Sushi host](https://elk-audio.github.io/elk-docs/html/intro/getting_started_with_development_kit_software.html)
