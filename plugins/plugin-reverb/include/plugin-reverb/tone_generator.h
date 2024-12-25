#pragma once

#include <juce_audio_basics/juce_audio_basics.h>

class ToneGenerator {
public:
  ToneGenerator();
  ~ToneGenerator() = default;

  void initialize(double sampleRate, float frequency);
  void process(juce::AudioBuffer<float>& buffer);
  void toggleNoteState();
  bool isNoteOn() const;

private:
  double currentAngle = 0.0;    // Current phase of the sine wave
  double angleDelta = 0.0;      // Angle increment per sample
  double sampleRate = 44100.0;  // Default sample rate
  float frequency = 440.0f;     // Frequency of the note (A4)

  bool noteOn = false;       // Whether the note is currently playing
  float envelope = 0.0f;     // Current envelope value
  float decayRate = 0.005f;  // Envelope decay rate
};
