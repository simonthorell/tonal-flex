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
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/dashboardHeader.vue";
import SushiUI from "@/components/SushiUI.vue";
import MainAppUI from "@/components/MainAppUI.vue";

export default defineComponent({
  name: "Dashboard",
  components: { Header, SushiUI, MainAppUI },
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
  height: 50px;
  position: fixed;
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
</style>
