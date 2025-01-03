<template>
  <div class="sushi-ui">
    <!-- Waiting message -->
    <div v-if="!isConnected" class="waiting">
      <h2>Waiting on plugins...</h2>
      <h3>Choose a plugin config if you haven't done so!</h3>
      <h3>Retry in 5 seconds...</h3>
    </div>

    <!-- Main UI -->
    <div v-else>
      <div class="transport-controls-container">
        <h2>Transport Controls</h2>
        <div v-if="loadingTransport" class="loading">Loading Transport Settings...</div>
        <div v-else-if="errorTransport" class="error">{{ errorTransport }}</div>
        <div v-else class="transport">
          <label>BPM:</label>
          <input type="number" v-model.number="bpm" @input="updateBpm" />
          <span>{{ bpm }}</span>
        </div>
      </div>

      <div class="active-plugins-container">
        <div v-if="loading" class="loading">Loading Plugins...</div>
        <div v-else-if="error" class="error">{{ error }}</div>
        <div v-else class="plugin-container">
          <div v-for="plugin in plugins" :key="plugin.id" class="plugin-box">
            <h3 class="plugin-title">{{ plugin.name }}</h3>
            <div v-for="param in plugin.parameters" :key="param.id" class="parameter">
              <label>{{ param.name }}:</label>
              <input
                type="range"
                :min="param.min"
                :max="param.max"
                step="0.01"
                @mousedown="param.showTempValue = true"
                @mouseup="handleSliderRelease(plugin.id, param)"
                @mouseleave="hideTempValue(param)"
                @input="setTempValue(param, $event)"
              />
              <span v-if="param.showTempValue">{{ tempValues[param.id] }}</span>
              <span v-else>{{ param.value }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, onUnmounted } from "vue";
import sushiStore from "@/stores/sushiStore";

export default defineComponent({
  name: "SushiUI",
  setup() {
    const bpm = ref<number>(120);
    const plugins = ref<any[]>([]);
    const tempValues = reactive<Record<number, number>>({});
    const errorTransport = ref<string | null>(null);
    const loadingTransport = ref(false);
    const error = ref<string | null>(null);
    const loading = ref(false);
    const isConnected = ref(false);
    const retryInterval = ref<number | null>(null);

    let stopParameterStream: (() => void) | null = null;
    let stopBpmStream: (() => void) | null = null;

    const retryConnection = () => {
      console.log("Retrying connection to Sushi in 5 seconds...");
      retryInterval.value = window.setTimeout(() => {
        fetchAndInitialize();
      }, 5000);
    };

    const fetchPlugins = async (): Promise<void> => {
      loading.value = true;
      try {
        const fetchedPlugins = await sushiStore.fetchPlugins();
        plugins.value = fetchedPlugins.map((plugin) => ({
          ...plugin,
          parameters: plugin.parameters.map((param) => ({
            ...param,
            showTempValue: false,
          })),
        }));
        console.log("Fetched plugins:", plugins.value);
      } catch (err) {
        error.value = (err as Error).message;
        console.error("Failed to fetch plugins:", err);
      } finally {
        loading.value = false;
      }
    };

    const setTempValue = (param: any, event: Event) => {
      const newValue = parseFloat((event.target as HTMLInputElement).value);
      tempValues[param.id] = newValue; // Store the temporary value
      param.showTempValue = true; // Show the temporary value
    };

    const hideTempValue = (param: any) => {
      param.showTempValue = false; // Hide the temporary value display
    };

    const handleSliderRelease = async (pluginId: number, param: any) => {
      param.showTempValue = false; // Hide the temporary value when the slider is released
      const newValue = tempValues[param.id]; // Get the stored temporary value

      if (newValue !== undefined) {
        try {
          await updateParam(pluginId, param.id, newValue); // Send the new value to Sushi
          console.log(`Updated parameter ${param.name} to ${newValue}`);
        } catch (error) {
          console.error(`Failed to update parameter ${param.name}:`, error);
        }
      }
    };

    const updateParam = async (pluginId: number, paramId: number, value: number) => {
      try {
        console.log(`Sending parameter update pluginId=${pluginId}, paramId=${paramId} to value=${value}`);
        await sushiStore.updateParameter({ processorId: pluginId, parameterId: paramId }, value);
      } catch (err) {
        console.error("Failed to update parameter:", err);
      }
    };

    const fetchTransport = async () => {
      loadingTransport.value = true;
      try {
        const { bpm: fetchedBpm } = await sushiStore.fetchTransportSettings();
        bpm.value = fetchedBpm;
      } catch (err) {
        errorTransport.value = (err as Error).message;
        console.error("Failed to fetch transport settings:", err);
      } finally {
        loadingTransport.value = false;
      }
    };

    const updateBpm = async () => {
      try {
        await sushiStore.updateBpm(bpm.value);
      } catch (err) {
        console.error("Failed to update BPM:", err);
      }
    };

    const subscribeToUpdates = async () => {
      stopParameterStream = sushiStore.streamParameterUpdates(
        (update) => {
          const plugin = plugins.value.find((p) => p.id === update.parameter?.processorId);
          if (plugin) {
            const param = plugin.parameters.find((p: any) => p.id === update.parameter?.parameterId);
            if (param) {
              if (param.value !== update.normalizedValue) {
                console.log(`Stream update for parameter ${param.name}: normalizedValue=${update.normalizedValue}`);
                param.value = update.normalizedValue ?? param.value;
              }
            }
          }
        },
        (error) => {
          console.error("Parameter stream error, retrying:", error);
          isConnected.value = false;
          retryConnection();
        }
      );

      stopBpmStream = sushiStore.streamBpmUpdates(
        (update) => {
          if (update.transport?.oneofKind === "tempo") {
            bpm.value = update.transport.tempo;
          }
        },
        (error) => {
          console.error("BPM stream error, retrying:", error);
          isConnected.value = false;
          retryConnection();
        }
      );
    };

    const fetchAndInitialize = async () => {
      try {
        stopParameterStream?.();
        stopBpmStream?.();
        if (retryInterval.value) clearTimeout(retryInterval.value);

        await fetchPlugins();
        await fetchTransport();
        await subscribeToUpdates();

        isConnected.value = true;
        console.log("Connected to Sushi.");
      } catch (err) {
        console.error("Failed to connect to Sushi. Retrying in 5 seconds:", err);
        retryConnection();
      }
    };

    onMounted(() => {
      fetchAndInitialize();
    });

    onUnmounted(() => {
      stopParameterStream?.();
      stopBpmStream?.();
      if (retryInterval.value) clearTimeout(retryInterval.value);
    });

    return {
      bpm,
      plugins,
      tempValues,
      error,
      loading,
      errorTransport,
      loadingTransport,
      isConnected,
      updateParam,
      updateBpm,
      setTempValue,
      handleSliderRelease,
      hideTempValue,

    };
  },
});
</script>


<style scoped>
.sushi-ui {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #131313;
}

.transport-controls-container {
  width: 100%;
  margin-bottom: 20px;
}

.active-plugins-container {
  width: 100%;
  padding: 20px;
}

.plugin-container {
  column-count: 3;
  column-gap: 20px;
}

.plugin-box {
  background-color: rgba(255, 255, 255, 0.1);
  border: 2px solid white;
  border-radius: 10px;
  padding: 15px;
  display: inline-block;
  width: 100%;
  margin-bottom: 20px;
}

.plugin-title {
  margin-bottom: 10px;
  font-size: 1.2em;
  text-align: center;
  color: #fff;
}

.parameter {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.parameter label {
  margin-bottom: 5px;
  font-size: 0.9em;
  color: #ccc;
}

.parameter input[type="range"] {
  width: 100%;
}

.parameter span {
  margin-top: 5px;
  font-size: 0.8em;
  color: #ddd;
}

.loading,
.error {
  text-align: center;
  margin-top: 20px;
  font-size: 1.2em;
  color: #f88;
}

.waiting{
  color:blue;
  margin-top: 10vh;
}
</style>
