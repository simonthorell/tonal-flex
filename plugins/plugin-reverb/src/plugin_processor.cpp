#include "plugin-reverb/plugin_processor.h"
#include "plugin-reverb/plugin_editor.h"

namespace audio_plugin {
AudioPluginAudioProcessor::AudioPluginAudioProcessor()
    : AudioProcessor(
          BusesProperties()
#if !JucePlugin_IsMidiEffect
#if !JucePlugin_IsSynth
              .withInput("Input", juce::AudioChannelSet::stereo(), true)
#endif
              .withOutput("Output", juce::AudioChannelSet::stereo(), true)
#endif
              ),
      parameters(*this,
                 nullptr,
                 "PARAMETERS",
                 {std::make_unique<juce::AudioParameterFloat>("roomSize",
                                                              "Room Size",
                                                              0.0f,
                                                              1.0f,
                                                              0.5f),
                  std::make_unique<juce::AudioParameterFloat>("damping",
                                                              "Damping",
                                                              0.0f,
                                                              1.0f,
                                                              0.3f),
                  std::make_unique<juce::AudioParameterFloat>("wetLevel",
                                                              "Wet Level",
                                                              0.0f,
                                                              1.0f,
                                                              0.5f),
                  std::make_unique<juce::AudioParameterFloat>("dryLevel",
                                                              "Dry Level",
                                                              0.0f,
                                                              1.0f,
                                                              0.5f)}) {
}

AudioPluginAudioProcessor::~AudioPluginAudioProcessor() {}

const juce::String AudioPluginAudioProcessor::getName() const {
  return "Reverb";
  // return JucePlugin_Name;
}

bool AudioPluginAudioProcessor::acceptsMidi() const {
  return false;
}
bool AudioPluginAudioProcessor::producesMidi() const {
  return false;
}
bool AudioPluginAudioProcessor::isMidiEffect() const {
  return false;
}
double AudioPluginAudioProcessor::getTailLengthSeconds() const {
  return 2.0;
}

int AudioPluginAudioProcessor::getNumPrograms() {
  return 1;
}
int AudioPluginAudioProcessor::getCurrentProgram() {
  return 0;
}
void AudioPluginAudioProcessor::setCurrentProgram(int index) {
  juce::ignoreUnused(index);
}
const juce::String AudioPluginAudioProcessor::getProgramName(int index) {
  juce::ignoreUnused(index);
  return {};
}
void AudioPluginAudioProcessor::changeProgramName(int index,
                                                  const juce::String& newName) {
  juce::ignoreUnused(index, newName);
}

void AudioPluginAudioProcessor::prepareToPlay(double sampleRate,
                                              int samplesPerBlock) {
  juce::ignoreUnused(samplesPerBlock);

  // reverbParams.roomSize = 0.5f;
  // reverbParams.damping = 0.3f;
  // reverbParams.wetLevel = 0.5f;
  // reverbParams.dryLevel = 0.5f;
  // reverbParams.width = 1.0f;
  // reverbParams.freezeMode = 0.0f;

  reverbParams.roomSize = *parameters.getRawParameterValue("roomSize");
  reverbParams.damping = *parameters.getRawParameterValue("damping");
  reverbParams.wetLevel = *parameters.getRawParameterValue("wetLevel");
  reverbParams.dryLevel = *parameters.getRawParameterValue("dryLevel");

  reverb.setParameters(reverbParams);
  reverb.reset();

  // Ignore build warnings for unused variables
  juce::ignoreUnused(sampleRate, samplesPerBlock);
}

void AudioPluginAudioProcessor::releaseResources() {}

bool AudioPluginAudioProcessor::isBusesLayoutSupported(
    const BusesLayout& layouts) const {
  if (layouts.getMainOutputChannelSet() != juce::AudioChannelSet::mono() &&
      layouts.getMainOutputChannelSet() != juce::AudioChannelSet::stereo())
    return false;

#if !JucePlugin_IsSynth
  if (layouts.getMainOutputChannelSet() != layouts.getMainInputChannelSet())
    return false;
#endif

  return true;
}

void AudioPluginAudioProcessor::processBlock(juce::AudioBuffer<float>& buffer,
                                             juce::MidiBuffer& midiMessages) {
  juce::ignoreUnused(midiMessages);
  juce::ScopedNoDenormals noDenormals;

  for (int channel = 0; channel < buffer.getNumChannels(); ++channel) {
    auto* channelData = buffer.getWritePointer(channel);
    reverb.processMono(channelData, buffer.getNumSamples());
  }
}

bool AudioPluginAudioProcessor::hasEditor() const {
  return true;
}

juce::AudioProcessorEditor* AudioPluginAudioProcessor::createEditor() {
  return new AudioPluginAudioProcessorEditor(*this);
}

void AudioPluginAudioProcessor::getStateInformation(
    juce::MemoryBlock& destData) {
  juce::ignoreUnused(destData);
}

void AudioPluginAudioProcessor::setStateInformation(const void* data,
                                                    int sizeInBytes) {
  juce::ignoreUnused(data, sizeInBytes);
}
}  // namespace audio_plugin

juce::AudioProcessor* JUCE_CALLTYPE createPluginFilter() {
  return new audio_plugin::AudioPluginAudioProcessor();
}