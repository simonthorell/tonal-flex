<template>
  <div class="dashboard">
    <SushiUI />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SushiUI from "@/components/SushiUI.vue";

export default defineComponent({
  name: "Dashboard",
  components: { SushiUI },
});
</script>

<style scoped>
.dashboard {
  width:100vw;
  height:100vh;
  font-family: Arial, sans-serif;
  color: #333;
}
</style>
