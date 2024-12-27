<template>
  <div class="sushi-ui">
    <div class="transport-ccontrols-ontainer">
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

    <div class="channel-configuration-container">
      <h2>Channel Configuration</h2>
      <div v-if="loadingChannels" class="loading">Loading Channels...</div>
      <div v-else-if="errorChannels" class="error">{{ errorChannels }}</div>
      <div v-else class="channels">
        <h3>Input Channels</h3>
        <div v-for="connection in audioConnections" :key="connection.engine_channel" class="connection">
          <span>Track: {{ connection.track.id }}</span>
          <span>Engine Channel: {{ connection.engine_channel }}</span>
          <button @click="connectNewChannel(connection.track.id)">Connect New</button>
        </div>
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
  import { defineComponent, ref, onMounted } from "vue";
  import pluginStore from "@/stores/pluginStore";

  export default defineComponent({
    name: "SushiUI",
    setup() {
      const bpm = ref<number>(120); // Default BPM
      const playingMode = ref<string>("Stopped");
      const errorTransport = ref<string | null>(null);
      const loadingTransport = ref(false);

      const audioConnections = ref<any[]>([]);
      const errorChannels = ref<string | null>(null);
      const loadingChannels = ref(false);

      const plugins = ref<any[]>([]);
      const error = ref<string | null>(null);
      const loading = ref(false);

      // Fetch Plugins
      const fetchPlugins = async () => {
        loading.value = true;
        try {
          let fetchedPlugins = await pluginStore.fetchPlugins();

          // Sort plugins: Move "main" to the top
          plugins.value = fetchedPlugins.sort((a, b) => {
            if (a.name.toLowerCase() === "main") return -1; // "main" goes to the top
            if (b.name.toLowerCase() === "main") return 1;
            return 0; // Keep other items in their order
          });
        } catch (err) {
          error.value = (err as Error).message;
        } finally {
          loading.value = false;
        }
      };


      const updateParam = async (pluginId: number, paramId: number, value: number) => {
        try {
          await pluginStore.updateParameter(
            {
              processorId: pluginId,
              parameterId: paramId,
            },
            value
          );
        } catch (err) {
          console.error("Failed to update parameter:", err);
        }
      };

      // Fetch Transport Settings
      const fetchTransport = async () => {
        loadingTransport.value = true;
        try {
          const { bpm: fetchedBpm, playingMode: fetchedPlayingMode } = await pluginStore.fetchTransportSettings();
          bpm.value = fetchedBpm;
          playingMode.value = fetchedPlayingMode;
        } catch (err) {
          errorTransport.value = (err as Error).message;
        } finally {
          loadingTransport.value = false;
        }
      };

      const updateBpm = async () => {
        try {
          await pluginStore.updateBpm(bpm.value);
        } catch (err) {
          console.error("Failed to update BPM:", err);
        }
      };

      const fetchChannels = async () => {
        loadingChannels.value = true;
        try {
          audioConnections.value = await pluginStore.fetchAudioConnections();
        } catch (err) {
          errorChannels.value = (err as Error).message;
        } finally {
          loadingChannels.value = false;
        }
      };

      const connectNewChannel = async (trackId: number) => {
        try {
          await pluginStore.connectChannel(trackId, 1); // Example: connect to engine channel 1
          await fetchChannels(); // Refresh connections
        } catch (err) {
          console.error("Failed to connect channel:", err);
        }
      };

      onMounted(() => {
        fetchTransport();
        fetchChannels();
        fetchPlugins();
      });

      return {
        bpm,
        playingMode,
        errorTransport,
        loadingTransport,
        audioConnections,
        errorChannels,
        loadingChannels,
        updateBpm,
        connectNewChannel,
        plugins,
        error,
        loading,
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
    align-items: center; /* Center the grid horizontally */
    justify-content: flex-start;
  }

  .transport-controls-container{
    width: 100wv;
  }

  .channel-configuration-container{
    width: 100wv;
  }

  .connection {
    display: flex;
    align-items: center;
  }

  label {
    margin-right: 10px;
  }

  .active-plugins-container {
  width:100vw;
  padding: 20px;
  }

  .plugin-container {
    column-count: 2; /* Number of columns */
    column-gap: 20px; /* Space between columns */
  }

  .plugin-box {
    background-color: rgba(255, 255, 255, 0.1);
    border: 2px solid white;
    border-radius: 10px;
    padding: 15px;
    display: inline-block; /* Necessary for Masonry */
    width: 100%; /* Ensure boxes span full column width */
    margin-bottom: 20px; /* Space between rows */
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
    color: #ccc; /* Optional: Subtle color for labels */
  }

  .parameter input[type="range"] {
    width: 100%;
  }

  .parameter span {
    margin-top: 5px;
    font-size: 0.8em;
    color: #ddd; /* Optional: Subtle color for values */
  }

  .loading,
  .error {
    text-align: center;
    margin-top: 20px;
    font-size: 1.2em;
    color: #f88; /* Optional: Error text color */
  }
  </style>
  