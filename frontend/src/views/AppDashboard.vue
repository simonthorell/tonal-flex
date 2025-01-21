<template>
  <div class="dashboard">
    <div class="header">
      <Heading :isSynthVisible="isSynthVisible" @toggle-synth="toggleSynthVisibility" />
    </div>
    <div class="sushi-tracks">
      <Tracks />
    </div>
    <div class="sushi-container">
    </div>
    <div v-if="isSynthVisible" class="synth-overlay">
      <Synth />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Heading from "@/components/dashboardHeader.vue";
import Synth from "@/components/VirtualSynth.vue"
import Tracks from '@/components/sushiTracks.vue'

export default defineComponent({
  name: "App-Dashboard",
  components: { Heading, Synth, Tracks },
  setup() {
    const isSynthVisible = ref(false);
    const toggleSynthVisibility = (newVisibility: boolean) => {
      isSynthVisible.value = newVisibility;
      console.log("Synth visibility:", isSynthVisible.value);
    };

    return {
      isSynthVisible,
      toggleSynthVisibility
    };
  },
});
</script>

<style scoped>
.dashboard {
  width:100vw;
  height:100vh;
  font-family: Arial, sans-serif;
  color: #333;
}

.header{
  width: 100vw;
  background-color: #1c1c1c;
}

.sushi-tracks{
  width:100vw;
  height: 40vh;
  background-color:#2b2b2b;
  overflow:hidden;
}

.sushi-container{
  width: 100vw;
}

.virtual-synth{
  bottom: 0;
  width: 100%;
  z-index: 1000; /* Ensure it stays on top of other content */
}
</style>
