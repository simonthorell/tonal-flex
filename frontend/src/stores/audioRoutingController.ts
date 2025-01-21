import {
  AudioRoutingController,
  GenericVoidValue,
  AudioConnectionList,
  AudioConnection,
  TrackIdentifier,
} from "@/proto/sushi_rpc";
import { AudioRoutingControllerClient } from "@/proto/sushi_rpc.client";
import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";
import type { RpcInterceptor, RpcOptions, UnaryCall, MethodInfo } from "@protobuf-ts/runtime-rpc";
import { RpcError } from "@protobuf-ts/runtime-rpc";

class SushiAudioRoutingController {
  private transport: GrpcWebFetchTransport;
  private controller: AudioRoutingControllerClient;

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

    this.controller = new AudioRoutingControllerClient(this.transport);
  }

  private handleError(err: unknown, message: string): void {
    if (err instanceof RpcError) {
      console.error(`${message}: ${err.message}`);
    } else {
      console.error(`${message}: Unknown error`, err);
    }
  }

  async getAllInputConnections(): Promise<AudioConnectionList> {
    try {
      const response = await this.transport.unary(
        AudioRoutingController.methods[0],
        GenericVoidValue.create(),
        {} as RpcOptions
      );
      return response.response;
    } catch (err) {
      this.handleError(err, "Error fetching all input connections");
      throw err;
    }
  }

  async getAllOutputConnections(): Promise<AudioConnectionList> {
    try {
      const response = await this.transport.unary(
        AudioRoutingController.methods[1],
        GenericVoidValue.create(),
        {} as RpcOptions
      );
      return response.response;
    } catch (err) {
      this.handleError(err, "Error fetching all output connections");
      throw err;
    }
  }

  async getInputConnectionsForTrack(trackId: number): Promise<AudioConnectionList> {
    try {
      const response = await this.transport.unary(
        AudioRoutingController.methods[2],
        TrackIdentifier.create({ id: trackId }),
        {} as RpcOptions
      );
      return response.response;
    } catch (err) {
      this.handleError(err, `Error fetching input connections for track ID ${trackId}`);
      throw err;
    }
  }

  async getOutputConnectionsForTrack(trackId: number): Promise<AudioConnectionList> {
    try {
      const response = await this.transport.unary(
        AudioRoutingController.methods[3],
        TrackIdentifier.create({ id: trackId }),
        {} as RpcOptions
      );
      return response.response;
    } catch (err) {
      this.handleError(err, `Error fetching output connections for track ID ${trackId}`);
      throw err;
    }
  }

  async connectInputChannelToTrack(connection: AudioConnection): Promise<void> {
    try {
      await this.transport.unary(
        AudioRoutingController.methods[4],
        connection,
        {} as RpcOptions
      );
      console.log(`Input channel connected to track.`);
    } catch (err) {
      this.handleError(err, "Error connecting input channel to track");
      throw err;
    }
  }

  async connectOutputChannelFromTrack(connection: AudioConnection): Promise<void> {
    try {
      await this.transport.unary(
        AudioRoutingController.methods[5],
        connection,
        {} as RpcOptions
      );
      console.log(`Output channel connected from track.`);
    } catch (err) {
      this.handleError(err, "Error connecting output channel from track");
      throw err;
    }
  }

  async disconnectInput(connection: AudioConnection): Promise<void> {
    try {
      await this.transport.unary(
        AudioRoutingController.methods[6],
        connection,
        {} as RpcOptions
      );
      console.log(`Input channel disconnected.`);
    } catch (err) {
      this.handleError(err, "Error disconnecting input channel");
      throw err;
    }
  }

  async disconnectOutput(connection: AudioConnection): Promise<void> {
    try {
      await this.transport.unary(
        AudioRoutingController.methods[7],
        connection,
        {} as RpcOptions
      );
      console.log(`Output channel disconnected.`);
    } catch (err) {
      this.handleError(err, "Error disconnecting output channel");
      throw err;
    }
  }

  async disconnectAllInputsFromTrack(trackId: number): Promise<void> {
    try {
      await this.transport.unary(
        AudioRoutingController.methods[8],
        TrackIdentifier.create({ id: trackId }),
        {} as RpcOptions
      );
      console.log(`All inputs disconnected from track ID ${trackId}.`);
    } catch (err) {
      this.handleError(err, `Error disconnecting all inputs from track ID ${trackId}`);
      throw err;
    }
  }

  async disconnectAllOutputsFromTrack(trackId: number): Promise<void> {
    try {
      await this.transport.unary(
        AudioRoutingController.methods[9],
        TrackIdentifier.create({ id: trackId }),
        {} as RpcOptions
      );
      console.log(`All outputs disconnected from track ID ${trackId}.`);
    } catch (err) {
      this.handleError(err, `Error disconnecting all outputs from track ID ${trackId}`);
      throw err;
    }
  }
}

export default SushiAudioRoutingController;
