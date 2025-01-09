<template>
  <div class="synth-overlay">
    <div class="controls">
      <label>Octave:</label>
      <input type="number" v-model="octave" min="-2" max="2" />
      <label>Velocity:</label>
      <input type="range" v-model="velocity" min="0" max="127" />
    </div>
    <div class="keyboard">
      <div
        v-for="note in keys"
        :key="note"
        :class="['key', { 'white-key': isWhiteKey(note), 'black-key': !isWhiteKey(note) }]"
        @mousedown="playNote(note)"
        @mouseup="stopNote(note)"
        @mouseleave="stopNote(note)"
      >
        {{ note }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import synthStore from "@/stores/synthStore";

export default defineComponent({
  name: "VirtualSynth",
  
  setup(props) {
    const octave = ref(0); // Default octave
    const velocity = ref(100); // Default velocity
    const activeNotes = ref(new Set<number>()); // Track active notes to avoid duplicates
    const isEnabled = ref(true); // Enable overlay only for specific configs

    // Notes for the keyboard
    const keys = ref(["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]);

    const isWhiteKey = (note: string) => !note.includes("#");

    const playNote = async (note: string) => {
      const midiNote = convertToMidi(note, octave.value);
      if (activeNotes.value.has(midiNote)) return;
      activeNotes.value.add(midiNote);

      await synthStore.sendNoteOn(midiNote, velocity.value);
    };

    const stopNote = async (note: string) => {
      const midiNote = convertToMidi(note, octave.value);
      if (!activeNotes.value.has(midiNote)) return;
      activeNotes.value.delete(midiNote);

      await synthStore.sendNoteOff(midiNote);
    };

    const convertToMidi = (note: string, octave: number): number => {
      const baseNotes: Record<string, number> = {
        C: 0, "C#": 1, D: 2, "D#": 3, E: 4,
        F: 5, "F#": 6, G: 7, "G#": 8, A: 9, "A#": 10, B: 11,
      };
      if (!(note in baseNotes)) {
        throw new Error(`Invalid note: ${note}`);
      }
      return baseNotes[note] + (octave + 2) * 12;
    };

    return {
      keys,
      octave,
      velocity,
      playNote,
      stopNote,
      isWhiteKey,
      isEnabled,
    };
  },
});
</script>

<style scoped>
.synth-overlay {
  position: fixed;
  bottom: 0;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.3);
}

.controls {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.controls label {
  margin-right: 10px;
}

.keyboard {
  width: 100vw;
  display: flex;
  justify-content: center;
}

.key {
  width: 40px;
  height: 150px;
  margin: 2px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  font-size: 0.9em;
  user-select: none;
}

.white-key {
  background: white;
  color: black;
  border: 1px solid black;
}

.black-key {
  background: black;
  color: white;
  width: 30px;
  height: 100px;
  margin-left: -15px;
  margin-right: -15px;
  z-index: 1;
}
</style>
