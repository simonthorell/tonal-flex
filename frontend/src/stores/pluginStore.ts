import { defineStore } from "pinia";
import { sushi_rpc } from "@/prototype/sushi_rpc_pb"; // Import the generated namespace
import { AudioGraphControllerClient } from "@/prototype/Sushi_rpcServiceClientPb";

// Access Protobuf types from the namespace
const { GenericVoidValue, ProcessorInfo, ProcessorInfoList } = sushi_rpc;

const client = new AudioGraphControllerClient("http://localhost:8080");

export const usePluginStore = defineStore("pluginStore", {
  state: () => ({
    plugins: [] as ProcessorInfo.AsObject[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchPlugins() {
      this.loading = true;
      this.error = null;

      try {
        // Create a request using the Protobuf-generated class
        const request = GenericVoidValue.create({}); // Adjust fields as necessary

        // Make the gRPC call
        const response = await new Promise<ProcessorInfoList>((resolve, reject) => {
          client.getAllProcessors(request, {}, (err, res) => {
            if (err) reject(err.message);
            else resolve(res as ProcessorInfoList);
          });
        });

        // Process the response
        const processors = response.getProcessorsList();
        this.plugins = processors.map((p) => p.toObject());
      } catch (err) {
        this.error = `Failed to fetch plugins: ${err}`;
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
  },
});
