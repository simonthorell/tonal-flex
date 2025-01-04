<template>
  <div class="main-app-ui">
    <div class="config-buttons">
      <div v-if="loadingConfigs">Waiting on connection...</div>
      <div v-else-if="errorConfigs" class="error">{{ errorConfigs }}</div>
      <div v-else class="button-grid">
        <button
          v-for="config in formattedConfigs"
          :key="config.name"
          class="button-84"
          role="button"
          @click="loadConfig(config.original)"
        >
          {{ config.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import mainAppStore from "@/stores/mainAppStore";

export default defineComponent({
  name: "MainAppUI",
  setup() {
    const configs = ref<string[]>([]);
    const formattedConfigs = ref<{ name: string; original: string }[]>([]);
    const configMessage = ref<string | null>(null);

    const loadingConfigs = ref(false);
    const loadingConfig = ref(false);
    const errorConfigs = ref<string | null>(null);

    const fetchConfigs = async () => {
      loadingConfigs.value = true;
      try {
        const fetchedConfigs = await mainAppStore.fetchConfigList();
        configs.value = fetchedConfigs;
        formattedConfigs.value = fetchedConfigs.map((config) => ({
          name: config.replace(/_/g, " ").replace(".json", ""), // Replace underscores with spaces and remove `.json`
          original: config, // Keep the original name for the backend
        }));
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
      fetchConfigs();
    });

    return {
      configs,
      formattedConfigs,
      configMessage,
      loadingConfigs,
      loadingConfig,
      errorConfigs,
      loadConfig,
    };
  },
});
</script>

<style scoped>
.main-app-ui {
  padding: 30px;
}

.config-buttons {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.button-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 30px;
}

.error {
  color: red;
}

.loading,
.status {
  color: blue;
}

.button-84 {
  align-items: center;
  background-color: initial;
  background-image: linear-gradient(#464d55, #25292e);
  border-radius: 8px;
  border-width: 0;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  color: rgb(62, 62, 255);
  cursor: pointer;
  display: flex;
  justify-content: center;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  height: 52px;
  padding: 0 16px; /* Adjusted for better text wrapping */
  transition: all 150ms;
  user-select: none;
  -webkit-user-select: none;
  white-space: pre-wrap; /* Allow wrapping while maintaining spacing */
  overflow-wrap: break-word; /* Ensure long words break correctly */
}

.button-84:hover {
  box-shadow: rgba(0, 1, 0, 0.2) 0 2px 8px;
  opacity: 0.85;
}

.button-84:focus {
  box-shadow: rgba(25, 0, 255, 0.3) 0 0 0 2px;
}

@media (max-width: 420px) {
  .button-84 {
    font-size: 14px;
    height: 48px;
    padding: 0 12px; /* Adjusted padding for smaller screens */
  }
}
</style>
