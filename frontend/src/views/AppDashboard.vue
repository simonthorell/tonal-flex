<template>
    <div class="dashboard">
      <h1>Sushi Dashboard</h1>
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else>
        <div class="build-info">
          <h3>Build Info</h3>
          <div v-if="buildInfo" class="info-container">
            <div class="info-row">
              <span class="label">Version:</span>
              <span class="value">{{ buildInfo.version }}</span>
            </div>
            <div class="info-row">
              <span class="label">Build Options:</span>
              <span class="value">{{ buildInfo.buildOptions.join(", ") }}</span>
            </div>
            <div class="info-row">
              <span class="label">Audio Buffer Size:</span>
              <span class="value">{{ buildInfo.audioBufferSize }}</span>
            </div>
            <div class="info-row">
              <span class="label">Commit Hash:</span>
              <span class="value">{{ buildInfo.commitHash }}</span>
            </div>
            <div class="info-row">
              <span class="label">Build Date:</span>
              <span class="value">{{ buildInfo.buildDate }}</span>
            </div>
          </div>
        </div>
      </div>
      <button class="reload-button" @click="reloadData">Reload</button>
    </div>
  </template>
  
  
  
  <script lang="ts">
  import { defineComponent, ref } from "vue";
  import pluginStore from "@/stores/pluginStore";
  
  export default defineComponent({
    name: "Dashboard",
    setup() {
      // State variables
      const buildInfo = ref<{
        version: string;
        buildOptions: string[];
        audioBufferSize: number;
        commitHash: string;
        buildDate: string;
      } | null>(null);
      const error = ref<string | null>(null);
      const loading = ref(false);
  
      // Fetch data from the gRPC client
      const fetchData = async () => {
        loading.value = true;
        error.value = null; // Reset error state
        try {
          buildInfo.value = await pluginStore.getBuildInfo();
        } catch (err) {
          error.value = (err as Error).message; // Capture error
        } finally {
          loading.value = false; // Reset loading state
        }
      };
  
      // Reload data on button click
      const reloadData = () => fetchData();
  
      // Fetch data on initial render
      fetchData();
  
      return {
        buildInfo,
        error,
        loading,
        reloadData,
      };
    },
  });
  </script>
  
  <style scoped>
.dashboard {
  max-width: 600px;
  margin: 20px auto;
  font-family: Arial, sans-serif;
  text-align: center;
  color: #333;
}

h1 {
  font-size: 2rem;
  color: #8b8a8a;
  margin-bottom: 20px;
}

.loading {
  font-size: 1.2rem;
  color: #888;
}

.error {
  font-size: 1rem;
  color: red;
  margin-top: 10px;
}

.build-info {
  background-color: #3b3b3b;
  border: 1px solid #4e4e4e;
  border-radius: 8px;
  padding: 15px;
  text-align: left;
  margin: 20px 0;
}

.build-info h3 {
  font-size: 1.5rem;
  color: #8b8a8a;
  margin-bottom: 10px;
}

.info-container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 10px 15px;
}

.info-row {
  display: contents;
}

.label {
  font-weight: bold;
  text-align: right;
  color: #8b8a8a;
}

.value {
  text-align: left;
  color: #c4c4c4;
}

.reload-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s ease;
}

.reload-button:hover {
  background-color: #45a049;
}
</style>
  