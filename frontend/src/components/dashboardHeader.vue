<template>
    <div class="header-container">
        <div class="toggle-switch-container">
            <label class="switch">
                <input type="checkbox" :checked="isSynthVisible" @change="toggleSynth" />
                <span class="slider"></span>
            </label>
            <span class="toggle-label">Synth</span>
        </div>
        <h2>Plugin Configurations</h2>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Header",
  props: {
    isSynthVisible: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["toggle-synth"],
  setup(props, { emit }) {
    const toggleSynth = (event: Event) => {
      const isChecked = (event.target as HTMLInputElement).checked;
      emit("toggle-synth", isChecked);
    };

    return {
      toggleSynth,
    };
  },
});
</script>

<style scoped>

.header-container{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100vw;
    height: 50px;
    background-color: #131313;
    color: blue;
    padding: 0 20px;
    }

.toggle-switch-container {
    display: flex;
    align-items: center;
    gap: 10px;
}

.toggle-label {
  font-size: 1em;
  color: blue;
}

/* Toggle Switch Styles */
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(62, 62, 255, 0.4);
  border-radius: 34px;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  border-radius: 50%;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: rgba(62, 62, 255, 0.8);
}

input:checked + .slider:before {
  transform: translateX(20px);
}

</style>