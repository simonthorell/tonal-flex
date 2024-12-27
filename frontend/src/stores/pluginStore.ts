import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";
import {
    SystemControllerClient,
    ParameterControllerClient,
    TransportControllerClient,
    AudioRoutingControllerClient,
    ProgramControllerClient,
    AudioGraphControllerClient,
} from "@/proto/sushi_rpc.client";
import {
    GenericVoidValue,
    ParameterIdentifier,
    ProcessorIdentifier,
    TrackIdentifier,
    AudioConnection,
    ParameterValue,
    GenericFloatValue,
    PlayingMode,
    PlayingMode_Mode,
} from "@/proto/sushi_rpc";
import type { RpcInterceptor, RpcOptions, UnaryCall } from "@protobuf-ts/runtime-rpc";

const addTeHeaderInterceptor: RpcInterceptor = {
    interceptUnary(next, method, input, options): UnaryCall<any, any> {
        const updatedOptions: RpcOptions = {
            ...options,
            meta: {
                ...options?.meta,
                TE: "trailers",
            },
        };
        return next(method, input, updatedOptions);
    },
};

const transport = new GrpcWebFetchTransport({
    baseUrl: "http://localhost:8080",
    interceptors: [addTeHeaderInterceptor],
});

const systemClient = new SystemControllerClient(transport);
const parameterClient = new ParameterControllerClient(transport);
const transportClient = new TransportControllerClient(transport);
const audioRoutingClient = new AudioRoutingControllerClient(transport);
const audioGraphClient = new AudioGraphControllerClient(transport);

// Fetch active plugins and their parameters
const fetchPlugins = async (): Promise<
    { id: number; name: string; parameters: { id: number; name: string; value: number; min: number; max: number }[] }[]
> => {
    const response = await audioGraphClient.getAllProcessors(GenericVoidValue.create());
    const processors = response.response.processors;

    // Fetch parameters for each processor
    const plugins = await Promise.all(
        processors.map(async (processor) => {
            const parameterResponse = await parameterClient.getProcessorParameters(
                ProcessorIdentifier.create({ id: processor.id })
            );
            const parameters = parameterResponse.response.parameters.map((param) => ({
                id: param.id,
                name: param.name,
                value: 0, // Placeholder; will be updated with actual value below
                min: param.minDomainValue,
                max: param.maxDomainValue,
            }));

            // Fetch the current value for each parameter
            const enrichedParameters = await Promise.all(
                parameters.map(async (param) => {
                    const valueResponse = await parameterClient.getParameterValue(
                        ParameterIdentifier.create({
                            processorId: processor.id,
                            parameterId: param.id,
                        })
                    );
                    return { ...param, value: valueResponse.response.value };
                })
            );

            return {
                id: processor.id,
                name: processor.name,
                parameters: enrichedParameters,
            };
        })
    );

    return plugins;
};


// Fetch BPM and transport settings
const fetchTransportSettings = async (): Promise<{ bpm: number; playingMode: string }> => {
    const tempoResponse = await transportClient.getTempo(GenericVoidValue.create());
    const modeResponse = await transportClient.getPlayingMode(GenericVoidValue.create());

    // Map PlayingMode_Mode to meaningful string values
    const playingModeMap: Record<PlayingMode_Mode, string> = {
        [PlayingMode_Mode.DUMMY]: "Dummy",
        [PlayingMode_Mode.STOPPED]: "Stopped",
        [PlayingMode_Mode.PLAYING]: "Playing",
        [PlayingMode_Mode.RECORDING]: "Recording",
    };

    return {
        bpm: tempoResponse.response.value,
        playingMode: playingModeMap[modeResponse.response.mode] || "Unknown",
    };
};

// Update a plugin parameter
const updateParameter = async (parameterId: { processorId: number; parameterId: number }, value: number): Promise<void> => {
    const request = ParameterValue.create({
        parameter: ParameterIdentifier.create(parameterId),
        value,
    });
    await parameterClient.setParameterValue(request);
};

// Fetch channel counts
const fetchChannels = async (): Promise<{ inputs: number; outputs: number }> => {
    const inputResponse = await systemClient.getInputAudioChannelCount(GenericVoidValue.create());
    const outputResponse = await systemClient.getOutputAudioChannelCount(GenericVoidValue.create());
    return { inputs: inputResponse.response.value, outputs: outputResponse.response.value };
};

// Fetch audio connections
const fetchAudioConnections = async (): Promise<AudioConnection[]> => {
    const response = await audioRoutingClient.getAllInputConnections(GenericVoidValue.create());
    return response.response.connections;
};

// Connect audio channels
const connectChannel = async (trackId: number, engineChannel: number, trackChannel = 0): Promise<void> => {
    const request = AudioConnection.create({
        track: TrackIdentifier.create({ id: trackId }),
        trackChannel,
        engineChannel,
    });
    await audioRoutingClient.connectInputChannelToTrack(request);
};

// Update BPM
const updateBpm = async (newBpm: number): Promise<void> => {
    const request = GenericFloatValue.create({ value: newBpm });
    await transportClient.setTempo(request);
};

const pluginStore = {
    fetchPlugins,
    fetchTransportSettings,
    updateParameter,
    fetchChannels,
    fetchAudioConnections,
    connectChannel,
    updateBpm,
};

export default pluginStore;
