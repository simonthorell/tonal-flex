import {
  TransportController,
  GenericVoidValue,
  GenericFloatValue,
  PlayingMode,
  PlayingMode_Mode,
  SyncMode,
  SyncMode_Mode,
  TimeSignature,
} from "@/proto/sushi_rpc";
import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";
import type { RpcInterceptor, RpcOptions, UnaryCall, MethodInfo } from "@protobuf-ts/runtime-rpc";
import { RpcError } from "@protobuf-ts/runtime-rpc";

class SushiTransportController {
  private transport: GrpcWebFetchTransport;

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
  }

  /**
   * Get the samplerate.
   */
  async getSamplerate(): Promise<number> {
    try {
      const response = await this.transport.unary(
        TransportController.methods[0], // GetSamplerate method
        GenericVoidValue.create(),
        {} as RpcOptions
      );
      return response.response.value || 0;
    } catch (err) {
      this.handleError(err, "Error getting samplerate.");
      throw err;
    }
  }

  /**
   * Get the current playing mode.
   */
  async getPlayingMode(): Promise<PlayingMode> {
    try {
      const response = await this.transport.unary(
        TransportController.methods[1], // GetPlayingMode method
        GenericVoidValue.create(),
        {} as RpcOptions
      );
      return response.response || PlayingMode_Mode.STOPPED;
    } catch (err) {
      this.handleError(err, "Error getting playing mode.");
      throw err;
    }
  }

  /**
   * Get the current sync mode.
   */
  async getSyncMode(): Promise<SyncMode> {
    try {
      const response = await this.transport.unary(
        TransportController.methods[2], // GetSyncMode method
        GenericVoidValue.create(),
        {} as RpcOptions
      );
      return response.response || SyncMode_Mode.INTERNAL;
    } catch (err) {
      this.handleError(err, "Error getting sync mode.");
      throw err;
    }
  }

  /**
   * Get the current time signature.
   */
  async getTimeSignature(): Promise<TimeSignature> {
    try {
      const response = await this.transport.unary(
        TransportController.methods[3], // GetTimeSignature method
        GenericVoidValue.create(),
        {} as RpcOptions
      );
      return response.response;
    } catch (err) {
      this.handleError(err, "Error getting time signature.");
      throw err;
    }
  }

  /**
   * Get the current tempo.
   */
  async getTempo(): Promise<number> {
    try {
      const response = await this.transport.unary(
        TransportController.methods[4], // GetTempo method
        GenericVoidValue.create(),
        {} as RpcOptions
      );
      return response.response.value || 0;
    } catch (err) {
      this.handleError(err, "Error getting tempo.");
      throw err;
    }
  }

  /**
   * Set the tempo.
   * @param tempo The new tempo value.
   */
  async setTempo(tempo: number): Promise<void> {
    try {
      const request = GenericFloatValue.create({ value: tempo });
      await this.transport.unary(
        TransportController.methods[5], // SetTempo method
        request,
        {} as RpcOptions
      );
      console.log(`Tempo set to ${tempo}.`);
    } catch (err) {
      this.handleError(err, `Error setting tempo to ${tempo}.`);
      throw err;
    }
  }

  /**
   * Set the playing mode.
   * @param mode The new playing mode.
   */
  async setPlayingMode(mode: PlayingMode): Promise<void> {
    try {
      await this.transport.unary(
        TransportController.methods[6], // SetPlayingMode method
        mode,
        {} as RpcOptions
      );
      console.log(`Playing mode set to ${mode}.`);
    } catch (err) {
      this.handleError(err, `Error setting playing mode to ${mode}.`);
      throw err;
    }
  }

  /**
   * Set the sync mode.
   * @param mode The new sync mode.
   */
  async setSyncMode(mode: SyncMode): Promise<void> {
    try {
      await this.transport.unary(
        TransportController.methods[7], // SetSyncMode method
        mode,
        {} as RpcOptions
      );
      console.log(`Sync mode set to ${mode}.`);
    } catch (err) {
      this.handleError(err, `Error setting sync mode to ${mode}.`);
      throw err;
    }
  }

  /**
   * Set the time signature.
   * @param timeSignature The new time signature.
   */
  async setTimeSignature(timeSignature: TimeSignature): Promise<void> {
    try {
      await this.transport.unary(
        TransportController.methods[8], // SetTimeSignature method
        timeSignature,
        {} as RpcOptions
      );
      console.log("Time signature set.");
    } catch (err) {
      this.handleError(err, "Error setting time signature.");
      throw err;
    }
  }

  /**
   * Handle errors for gRPC calls.
   */
  private handleError(err: unknown, message: string): void {
    if (err instanceof RpcError) {
      console.error(`${message}: ${err.message}`);
    } else {
      console.error(`${message}: Unknown error`, err);
    }
  }
}

export default SushiTransportController;
