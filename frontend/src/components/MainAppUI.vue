<template>
    <div class="main-app-ui">
      <h2>Main Application Control</h2>
  
      <div class="connection-status">
        <h3>Connection Status</h3>
        <div v-if="loadingStatus">Loading...</div>
        <div v-else-if="errorStatus" class="error">{{ errorStatus }}</div>
        <div v-else>
          <p>Message: {{ connectionStatus.message }}</p>
          <p>Status: {{ connectionStatus.connected ? "Connected" : "Disconnected" }}</p>
        </div>
      </div>
  
      <div class="config-list">
        <h3>Available Configurations</h3>
        <div v-if="loadingConfigs">Loading...</div>
        <div v-else-if="errorConfigs" class="error">{{ errorConfigs }}</div>
        <ul v-else>
          <li v-for="config in configs" :key="config">
            {{ config }}
            <button @click="loadConfig(config)">Load</button>
          </li>
        </ul>
      </div>
  
      <div v-if="loadingConfig" class="loading">Loading Configuration...</div>
      <div v-else-if="configMessage" class="status">{{ configMessage }}</div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from "vue";
  import mainAppStore from "@/stores/mainAppStore";
  
  export default defineComponent({
    name: "MainAppUI",
    setup() {
      const connectionStatus = ref<{ message: string; connected: boolean }>({ message: "", connected: false });
      const configs = ref<string[]>([]);
      const configMessage = ref<string | null>(null);
  
      const loadingStatus = ref(false);
      const loadingConfigs = ref(false);
      const loadingConfig = ref(false);
  
      const errorStatus = ref<string | null>(null);
      const errorConfigs = ref<string | null>(null);
  
      const fetchStatus = async () => {
        loadingStatus.value = true;
        try {
          connectionStatus.value = await mainAppStore.fetchConnectionStatus();
        } catch (err) {
          errorStatus.value = (err as Error).message;
        } finally {
          loadingStatus.value = false;
        }
      };
  
      const fetchConfigs = async () => {
        loadingConfigs.value = true;
        try {
          configs.value = await mainAppStore.fetchConfigList();
        } catch (err) {
          errorConfigs.value = (err as Error).message;
        } finally {
          loadingConfigs.value = false;
        }
      };
  
      const loadConfig = async (configName: string) => {
        loadingConfig.value = true;
        try {
          const result = await mainAppStore.loadConfig(configName);
          configMessage.value = result.message;
        } catch (err) {
          configMessage.value = `Failed to load configuration: ${(err as Error).message}`;
        } finally {
          loadingConfig.value = false;
        }
      };
  
      onMounted(() => {
        fetchStatus();
        fetchConfigs();
      });
  
      return {
        connectionStatus,
        configs,
        configMessage,
        loadingStatus,
        loadingConfigs,
        loadingConfig,
        errorStatus,
        errorConfigs,
        fetchStatus,
        fetchConfigs,
        loadConfig,
      };
    },
  });
  </script>
  
  <style scoped>
  .main-app-ui {
    padding: 20px;
    background-color: #1c1c1c;
  }
  
  .connection-status,
  .config-list {
    margin-bottom: 20px;
  }
  
  .error {
    color: red;
  }
  
  .loading,
  .status {
    color: blue;
  }
  </style>