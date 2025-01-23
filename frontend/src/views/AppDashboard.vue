<template>
  <div class="dashboard">
    <div class="left-panel">
      <LeftPanel />
    </div>
    <div class="main-panel">
      <EffectMap />
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LeftPanel from '@/components/LeftPanel.vue'
import EffectMap from '@/components/EffectMap.vue'

export default defineComponent({
  name: "App-Dashboard",
  components: { LeftPanel, EffectMap},

});
</script>

<style scoped>
.dashboard {
  display: grid;
  grid-template-columns: 85px 1fr;
  width:100vw;
  height:100vh;
  font-family: Arial, sans-serif;
  color: #1c1c1c;
}

.left-panel{
  height: 100vh;
}

.main-panel{
  width: 100%;
  height: 100%;
}

</style>
