<template>
  <div class="dashboard">
    <header>
      <h1>Sushi Plugin Dashboard</h1>
    </header>
    <section>
      <div v-if="loading">Loading plugins...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else-if="!plugins.length">
        <p>No plugins available.</p>
      </div>
      <div v-else class="plugin-list">
        <h2>Plugins</h2>
        <ul>
          <li
            v-for="plugin in plugins"
            :key="plugin.id"
            @click="selectPlugin(plugin)"
          >
            {{ plugin.name }}
          </li>
        </ul>
      </div>

      <div v-if="selectedPlugin" class="plugin-details">
        <h3>{{ selectedPlugin.name }}</h3>
        <p>Label: {{ selectedPlugin.label || "N/A" }}</p>
        <p>Parameters: {{ selectedPlugin.parameterCount || 0 }}</p>
        <p>Programs: {{ selectedPlugin.programCount || 0 }}</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { usePluginStore } from "@/stores/pluginStore";
import { ProcessorInfo } from "@/prototype/sushi_rpc_pb";

// Initialize the store
const pluginStore = usePluginStore();
pluginStore.fetchPlugins();

// Reactive references for plugins and selected plugin
const plugins = computed(() => pluginStore.plugins);
const selectedPlugin = ref<ProcessorInfo.AsObject | null>(null);

// Handle errors and loading state
const loading = computed(() => pluginStore.loading);
const error = computed(() => pluginStore.error);

// Select a plugin from the list
const selectPlugin = (plugin: ProcessorInfo.AsObject) => {
  selectedPlugin.value = plugin;
};
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.plugin-list {
  margin-bottom: 20px;
}

.plugin-list ul {
  list-style-type: none;
  padding: 0;
}

.plugin-list li {
  cursor: pointer;
  margin: 5px 0;
  padding: 5px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.plugin-details {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
}

.error {
  color: red;
  font-weight: bold;
}
</style>
