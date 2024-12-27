<template>
  <div class="dashboard">
    <h1>Sushi Dashboard</h1>
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
  text-align: center;
  color: #333;
}
</style>
