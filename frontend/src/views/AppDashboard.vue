<template>
  <div class="dashboard">
    <div class="header">
      <Header />
    </div>
    <div class="main-app-container">
      <MainAppUI />
    </div>
    <div class="sushi-container">
      <SushiUI />
    </div>
    <div class="synth-overlay">
      <Synth />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Header from "@/components/dashboardHeader.vue";
import SushiUI from "@/components/SushiUI.vue";
import MainAppUI from "@/components/MainAppUI.vue";
import Synth from "@/components/VirtualSynth.vue"

export default defineComponent({
  name: "Dashboard",
  components: { Header, SushiUI, MainAppUI, Synth },
  setup() {

    const handleConfigLoad = () => {
      
    };

    return {
      handleConfigLoad,
    };
  },
});
</script>

<style scoped>
.dashboard {
  width:100vw;
  height:100vh;
  display: flex;
  flex-direction: column;
  font-family: Arial, sans-serif;
  color: #333;
}

.header{
  width: 100vw;
  height: 50px;
  position: fixed;
  top: 0;
  z-index: 1000; /* Ensure it stays on top */
  background-color: #1c1c1c;
}

.main-app-container{
  width: 100vw;
  max-height: 200px;
  overflow: auto;
  margin-top:50px;
  border-top: 1px solid rgba(177, 177, 177, 0.2);
  border-bottom: 1px solid rgba(177, 177, 177, 0.2);
}

.sush-container{
  width: 100vw;

}

.virtual-synth{
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 1000; /* Ensure it stays on top of other content */
}
</style>
