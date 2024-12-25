# Tone Generator

Example Usage with implementation code snippets marked with `***`.

**plugin_processor.h:**

```cpp
#pragma once
...
#include "tone_generator.h"

namespace audio_plugin {
class AudioPluginAudioProcessor : public juce::AudioProcessor {
public:
  ...

private:
  ...

  // *** Add these to the header file ***
  ToneGenerator toneGenerator;
  double sampleRate = 44100.0;        // Default sample rate
  double timeElapsed = 0.0;           // Time elapsed in seconds
  const double toggleInterval = 0.5;  // Toggle interval in seconds

  ...
};
}  // namespace audio_plugin

```

**plugin_processor.cpp:**

```cpp
void AudioPluginAudioProcessor::processBlock(juce::AudioBuffer<float>& buffer, juce::MidiBuffer& midiMessages) {
  juce::ignoreUnused(midiMessages);
  juce::ScopedNoDenormals noDenormals;

  auto totalNumInputChannels = getTotalNumInputChannels();
  auto totalNumOutputChannels = getTotalNumOutputChannels();
  auto numSamples = buffer.getNumSamples();

  // Time increment per block
  double blockDuration = numSamples / sampleRate;

  // Clear unused output channels
  for (int i = totalNumInputChannels; i < totalNumOutputChannels; ++i)
    buffer.clear(i, 0, numSamples);

  // Update reverb parameters dynamically
  reverbParams.roomSize = *parameters.getRawParameterValue("roomSize");
  reverbParams.damping = *parameters.getRawParameterValue("damping");
  reverbParams.wetLevel = *parameters.getRawParameterValue("wetLevel");
  reverbParams.dryLevel = *parameters.getRawParameterValue("dryLevel");
  reverb.setParameters(reverbParams);

  // *** Process tone generator (for testing) ***
  toneGenerator.process(buffer);

  // Apply reverb to the generated tone
  for (int channel = 0; channel < buffer.getNumChannels(); ++channel) {
    auto* channelData = buffer.getWritePointer(channel);
    reverb.processMono(channelData, numSamples);
  }

  // *** Update elapsed time and toggle tone (for tone generator) ***
  timeElapsed += blockDuration;
  if (timeElapsed >= toggleInterval) {
    toneGenerator.toggleNoteState();
    timeElapsed = 0.0;
  }
}
```

**CMakeLists.txt:**

```CMake
target_sources(${PROJECT_NAME}
    PRIVATE
        src/plugin_editor.cpp
        src/plugin_processor.cpp
        <PATH-TO-TONE-GENERATOR>/tone_generator.cpp
        ${INCLUDE_DIR}/plugin_editor.h
        ${INCLUDE_DIR}/plugin_processor.h
        <PATH-TO-TONE-GENERATOR>/tone_generator.h
```
