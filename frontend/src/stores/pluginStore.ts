import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";
import { SystemControllerClient } from "@/proto/sushi_rpc.client";
import { GenericVoidValue } from "@/proto/sushi_rpc";
import type { RpcInterceptor, RpcOptions, UnaryCall } from "@protobuf-ts/runtime-rpc"; // Use `import type` for type-only imports

// Custom interceptor to add the `TE: trailers` header
const addTeHeaderInterceptor: RpcInterceptor = {
    interceptUnary(next, method, input, options): UnaryCall<any, any> {
        // Add the TE: trailers header
        const updatedOptions: RpcOptions = {
            ...options,
            meta: {
                ...options?.meta,
                TE: "trailers",
            },
        };
        return next(method, input, updatedOptions); // Forward the updated options
    },
};

// Create the gRPC transport with the custom interceptor
const transport = new GrpcWebFetchTransport({
    baseUrl: "http://localhost:8080", // Replace with your backend URL
    interceptors: [addTeHeaderInterceptor], // Add the custom interceptor
});

// Create the gRPC client
const client = new SystemControllerClient(transport);

// Fetch the Build Info
const fetchBuildInfo = async (): Promise<{
    version: string;
    buildOptions: string[];
    audioBufferSize: number;
    commitHash: string;
    buildDate: string;
}> => {
    const request = GenericVoidValue.create();
    const response = await client.getBuildInfo(request);
    return response.response;
};

const pluginStore = {
    getBuildInfo: fetchBuildInfo,
};

export default pluginStore;
