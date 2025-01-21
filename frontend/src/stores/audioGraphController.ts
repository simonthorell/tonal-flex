import {
  AudioGraphController,
  ProcessorStateSetRequest,
  CreateTrackRequest,
  CreateMultibusTrackRequest,
  CreatePreTrackRequest,
  CreatePostTrackRequest,
  CreateProcessorRequest,
  MoveProcessorRequest,
  DeleteProcessorRequest,
  TrackIdentifier,
  GenericVoidValue,
  GenericStringValue,
  ProcessorInfo,
  ProcessorState,
  ProcessorIdentifier,
  TrackInfo,
  ProcessorBypassStateSetRequest,
  PluginType,
} from "@/proto/sushi_rpc";
import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";
import type { RpcInterceptor, RpcOptions, UnaryCall, MethodInfo } from "@protobuf-ts/runtime-rpc";
import { AudioGraphControllerClient } from "@/proto/sushi_rpc.client";

class SushiAudioGraphController {
  private transport: GrpcWebFetchTransport;
  private controller: AudioGraphControllerClient;

  constructor(baseUrl: string) {
    const interceptor: RpcInterceptor = {
      interceptUnary<T extends object, U extends object>(
        next: (method: MethodInfo<T, U>, input: T, options: RpcOptions) => UnaryCall<T, U>,
        method: MethodInfo<T, U>,
        input: T,
        options: RpcOptions
      ): UnaryCall<T, U> {
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

    this.transport = new GrpcWebFetchTransport({
      baseUrl,
      interceptors: [interceptor],
    });

    this.controller = new AudioGraphControllerClient(this.transport);
  }

  async getAllProcessors(): Promise<ProcessorInfo[]> {
    const call = await this.transport.unary(
      AudioGraphController.methods[0], // GetAllProcessors method
      GenericVoidValue.create(),
      {} as RpcOptions
    );
    return call.response.processors || [];
  }

  /**
   * Get all tracks.
   */
  async getAllTracks(): Promise<TrackInfo[]> {
    const call = await this.transport.unary(
      AudioGraphController.methods[1], // GetAllTracks method
      GenericVoidValue.create(),
      {} as RpcOptions
    );
    return call.response.tracks || [];
  }

  /**
   * Get track ID by name.
   */
  async getTrackId(trackName: string): Promise<number> {
    const call = await this.transport.unary(
      AudioGraphController.methods[2], // GetTrackId method
      GenericStringValue.create({ value: trackName }),
      {} as RpcOptions
    );
    return call.response.id;
  }

  /**
   * Get track information.
   */
  async getTrackInfo(trackId: number): Promise<TrackInfo> {
    const call = await this.transport.unary(
      AudioGraphController.methods[3], // GetTrackInfo method
      TrackIdentifier.create({ id: trackId }),
      {} as RpcOptions
    );
    return call.response;
  }

  /**
   * Get all processors on a track.
   */
  async getTrackProcessors(trackId: number): Promise<ProcessorInfo[]> {
    const call = await this.transport.unary(
      AudioGraphController.methods[4], // GetTrackProcessors method
      TrackIdentifier.create({ id: trackId }),
      {} as RpcOptions
    );
    return call.response.processors || [];
  }

  /**
   * Get processor ID by name.
   */
  async getProcessorId(processorName: string): Promise<number> {
    const call = await this.transport.unary(
      AudioGraphController.methods[5], // GetProcessorId method
      GenericStringValue.create({ value: processorName }),
      {} as RpcOptions
    );
    return call.response.id;
  }

  /**
   * Get processor information.
   */
  async getProcessorInfo(processorId: number): Promise<ProcessorInfo> {
    const call = await this.transport.unary(
      AudioGraphController.methods[6], // GetProcessorInfo method
      ProcessorIdentifier.create({ id: processorId }),
      {} as RpcOptions
    );
    return call.response;
  }

  /**
   * Get processor bypass state.
   */
  async getProcessorBypassState(processorId: number): Promise<boolean> {
    const call = await this.transport.unary(
      AudioGraphController.methods[7], // GetProcessorBypassState method
      ProcessorIdentifier.create({ id: processorId }),
      {} as RpcOptions
    );
    return call.response.value;
  }

  /**
   * Get processor state.
   */
  async getProcessorState(processorId: number): Promise<ProcessorState> {
    const call = await this.transport.unary(
      AudioGraphController.methods[8], // GetProcessorState method
      ProcessorIdentifier.create({ id: processorId }),
      {} as RpcOptions
    );
    return call.response;
  }

  /**
   * Set processor bypass state.
   */
  async setProcessorBypassState(processorId: number, bypass: boolean): Promise<void> {
    const request = ProcessorBypassStateSetRequest.create({
      processor: ProcessorIdentifier.create({ id: processorId }),
      value: bypass,
    });
    await this.transport.unary(
      AudioGraphController.methods[9], // SetProcessorBypassState method
      request,
      {} as RpcOptions
    );
  }

  /**
   * Set processor state.
   */
  async setProcessorState(processorId: number, state: ProcessorState): Promise<void> {
    await this.transport.unary(
      AudioGraphController.methods[10], // SetProcessorState method
      ProcessorStateSetRequest.create({
        processor: ProcessorIdentifier.create({ id: processorId }),
        state,
      }),
      {} as RpcOptions
    );
  }

  /**
   * Create a new track.
   */
  async createTrack(name: string, channels: number): Promise<void> {
    const request = CreateTrackRequest.create({ name, channels });
    await this.transport.unary(
      AudioGraphController.methods[11], // CreateTrack method
      request,
      {} as RpcOptions
    );
  }

  /**
   * Create a multibus track.
   */
  async createMultibusTrack(name: string, buses: number): Promise<void> {
    const request = CreateMultibusTrackRequest.create({ name, buses });
    await this.transport.unary(
      AudioGraphController.methods[12], // CreateMultibusTrack method
      request,
      {} as RpcOptions
    );
  }

  /**
   * Create a pre track.
   */
  async createPreTrack(name: string): Promise<void> {
    const request = CreatePreTrackRequest.create({ name });
    await this.transport.unary(
      AudioGraphController.methods[13], // CreatePreTrack method
      request,
      {} as RpcOptions
    );
  }

  /**
   * Create a post track.
   */
  async createPostTrack(name: string): Promise<void> {
    const request = CreatePostTrackRequest.create({ name });
    await this.transport.unary(
      AudioGraphController.methods[14], // CreatePostTrack method
      request,
      {} as RpcOptions
    );
  }

  /**
   * Create a processor on a track.
   */
  async createProcessorOnTrack(
    name: string,
    uid: string,
    path: string,
    type: PluginType,
    trackId: number,
    beforeProcessorId?: number,
    addToBack?: boolean
  ): Promise<void> {
    const request = CreateProcessorRequest.create({
      name,
      uid,
      path,
      type,
      track: { id: trackId },
      position: {
        addToBack: addToBack ?? true,
        beforeProcessor: beforeProcessorId ? { id: beforeProcessorId } : undefined,
      },
    });
    await this.transport.unary(
      AudioGraphController.methods[15], // CreateProcessorOnTrack method
      request,
      {} as RpcOptions
    );
  }

  /**
   * Move a processor between tracks.
   */
  async moveProcessorOnTrack(
    processorId: number,
    sourceTrackId: number,
    destTrackId: number,
    beforeProcessorId?: number,
    addToBack?: boolean
  ): Promise<void> {
    const request = MoveProcessorRequest.create({
      processor: { id: processorId },
      sourceTrack: { id: sourceTrackId },
      destTrack: { id: destTrackId },
      position: {
        addToBack: addToBack ?? true,
        beforeProcessor: beforeProcessorId ? { id: beforeProcessorId } : undefined,
      },
    });
    await this.transport.unary(
      AudioGraphController.methods[16], // MoveProcessorOnTrack method
      request,
      {} as RpcOptions
    );
  }

  /**
   * Delete a processor from a track.
   */
  async deleteProcessorFromTrack(processorId: number, trackId: number): Promise<void> {
    const request = DeleteProcessorRequest.create({
      processor: { id: processorId },
      track: { id: trackId },
    });
    await this.transport.unary(
      AudioGraphController.methods[17], // DeleteProcessorFromTrack method
      request,
      {} as RpcOptions
    );
  }

  /**
   * Delete a track.
   */
  async deleteTrack(trackId: number): Promise<void> {
    const request = TrackIdentifier.create({ id: trackId });
    await this.transport.unary(
      AudioGraphController.methods[18], // DeleteTrack method
      request,
      {} as RpcOptions
    );
  }
}

export default SushiAudioGraphController;
