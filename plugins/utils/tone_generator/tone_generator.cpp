#include "plugin-reverb/tone_generator.h"

ToneGenerator::ToneGenerator() {}

void ToneGenerator::initialize(double newSampleRate, float newFrequency) {
  sampleRate = newSampleRate;
  frequency = newFrequency;
  angleDelta = juce::MathConstants<double>::twoPi * frequency / sampleRate;
}

void ToneGenerator::process(juce::AudioBuffer<float>& buffer) {
  auto numSamples = buffer.getNumSamples();

  for (int channel = 0; channel < buffer.getNumChannels(); ++channel) {
    auto* channelData = buffer.getWritePointer(channel);

    for (int sample = 0; sample < numSamples; ++sample) {
      float sineWave = 0.0f;

      if (noteOn) {
        sineWave = std::sin(currentAngle);
        currentAngle += angleDelta;

        // Wrap the angle to prevent overflow
        if (currentAngle >= juce::MathConstants<double>::twoPi)
          currentAngle -= juce::MathConstants<double>::twoPi;

        // Apply envelope
        envelope = std::max(0.0f, envelope - decayRate);
      }

      channelData[sample] = sineWave * envelope;
    }
  }
}

void ToneGenerator::toggleNoteState() {
  noteOn = !noteOn;
  envelope = noteOn ? 1.0f : 0.0f;  // Reset envelope when note turns on
}

bool ToneGenerator::isNoteOn() const {
  return noteOn;
}
