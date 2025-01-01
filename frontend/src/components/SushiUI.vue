<template>
  <div class="sushi-ui">
    <div class="transport-controls-container">
      <h2>Transport Controls</h2>
      <div v-if="loadingTransport" class="loading">Loading Transport Settings...</div>
      <div v-else-if="errorTransport" class="error">{{ errorTransport }}</div>
      <div v-else class="transport">
        <label>BPM:</label>
        <input type="number" v-model.number="bpm" @input="updateBpm" />
        <span>{{ bpm }}</span>
        <label>Mode:</label>
        <span>{{ playingMode }}</span>
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
              v-model.number="param.value"
              @input="updateParam(plugin.id, param.id, param.value)"
            />
            <span>{{ param.value }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from "vue";
import pluginStore from "@/stores/pluginStore";

export default defineComponent({
  name: "SushiUI",
  setup() {
    const bpm = ref<number>(120);
    const playingMode = ref<string>("Stopped");
    const errorTransport = ref<string | null>(null);
    const loadingTransport = ref(false);

    const plugins = ref<any[]>([]);
    const error = ref<string | null>(null);
    const loading = ref(false);

    let stopTransportStream: (() => void) | null = null;
    let stopParameterStream: (() => void) | null = null;

    // Fetch plugins
    const fetchPlugins = async () => {
      loading.value = true;
      try {
        const fetchedPlugins = await pluginStore.fetchPlugins();
        plugins.value = fetchedPlugins.sort((a, b) => {
          if (a.name.toLowerCase() === "main") return -1;
          if (b.name.toLowerCase() === "main") return 1;
          return 0;
        });
      } catch (err) {
        error.value = (err as Error).message;
      } finally {
        loading.value = false;
      }
    };

    // Update parameter
    const updateParam = async (pluginId: number, paramId: number, value: number) => {
      try {
        await pluginStore.updateParameter(
          { processorId: pluginId, parameterId: paramId },
          value
        );
      } catch (err) {
        console.error("Failed to update parameter:", err);
      }
    };

    // Fetch transport settings
    const fetchTransport = async () => {
      loadingTransport.value = true;
      try {
        const { bpm: fetchedBpm, playingMode: fetchedPlayingMode } =
          await pluginStore.fetchTransportSettings();
        bpm.value = fetchedBpm;
        playingMode.value = fetchedPlayingMode;
      } catch (err) {
        errorTransport.value = (err as Error).message;
      } finally {
        loadingTransport.value = false;
      }
    };

    // Update BPM
    const updateBpm = async () => {
      try {
        await pluginStore.updateBpm(bpm.value);
      } catch (err) {
        console.error("Failed to update BPM:", err);
      }
    };

    // Stream transport updates
    const subscribeToTransportChanges = () => {
      stopTransportStream = pluginStore.streamBpmUpdates(
        (update) => {
          if (update.transport?.oneofKind === "tempo") {
            bpm.value = update.transport.tempo;
          }
          if (update.transport?.oneofKind === "playingMode") {
            playingMode.value = update.transport.playingMode.mode === 2 ? "Playing" : "Stopped"; // Assuming mode 2 is playing.
          }
        },
        (error) => {
          console.error("Transport stream error:", error);
        }
      );
    };

    // Stream parameter updates
    const subscribeToParameterUpdates = () => {
      stopParameterStream = pluginStore.streamParameterUpdates(
        (update) => {
          const plugin = plugins.value.find((p) => p.id === update.parameter?.processorId);
          if (plugin) {
            const param = plugin.parameters.find((p: any) => p.id === update.parameter?.parameterId);
            if (param) {
              param.value = update.normalizedValue || param.value;
            }
          }
        },
        (error) => {
          console.error("Parameter stream error:", error);
        }
      );
    };

    onMounted(() => {
      fetchTransport();
      fetchPlugins();
      subscribeToTransportChanges();
      subscribeToParameterUpdates();
    });

    onUnmounted(() => {
      stopTransportStream?.();
      stopParameterStream?.();
    });

    return {
      bpm,
      playingMode,
      errorTransport,
      loadingTransport,
      plugins,
      error,
      loading,
      updateBpm,
      updateParam,
    };
  },
});
</script>

<style scoped>
.sushi-ui {
  width: 100vw;
  height: 100vh;
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
  column-count: 2;
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
</style>
