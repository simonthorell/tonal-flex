<template>

    <div class="header-container">
      <div class="buttons">
        <button class="add-track-btn">Add Track</button>
      </div>
      <!--
        <div class="toggle-switch-container">
            <label class="switch">
                <input type="checkbox" :checked="isSynthVisible" @change="toggleSynth" />
                <span class="slider"></span>
            </label>
            <span class="toggle-label">Synth</span>
        </div>
        -->
    </div>

</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "dashboardHeader",
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

    width: 100vw;
    height:8vh;
    background-color: #131313;
    color: blue;
    background: rgb(0,0,0);
    background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(92,33,1,1) 12%, rgba(0,0,0,1) 59%);
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

.add-track-btn{
  width:150px;
  height:50px;
  background-color:orange;
  border: none;
}

.add-track-btn{
  width:150px;
  height:50px;
  background-color:orange;
  border: none;
}



</style>
