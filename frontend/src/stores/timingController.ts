import {
  TimingController,
  GenericVoidValue,
  GenericBoolValue,
  CpuTimings,
  TrackIdentifier,
  ProcessorIdentifier,
} from "@/proto/sushi_rpc";
import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";
import type { RpcInterceptor, RpcOptions, UnaryCall, MethodInfo } from "@protobuf-ts/runtime-rpc";
import { RpcError } from "@protobuf-ts/runtime-rpc";

class SushiTimingController {
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
   * Get whether timings are enabled.
   */
  async getTimingsEnabled(): Promise<boolean> {
    try {
      const response = await this.transport.unary(
        TimingController.methods[0], // GetTimingsEnabled method
        GenericVoidValue.create(),
        {} as RpcOptions
      );
      return response.response.value || false;
    } catch (err) {
      this.handleError(err, "Error getting timings enabled status.");
      throw err;
    }
  }

  /**
   * Set whether timings are enabled.
   * @param enabled True to enable timings, false to disable.
   */
  async setTimingsEnabled(enabled: boolean): Promise<void> {
    try {
      const request = GenericBoolValue.create({ value: enabled });
      await this.transport.unary(
        TimingController.methods[1], // SetTimingsEnabled method
        request,
        {} as RpcOptions
      );
      console.log(`Timings enabled set to ${enabled}.`);
    } catch (err) {
      this.handleError(err, `Error setting timings enabled to ${enabled}.`);
      throw err;
    }
  }

  /**
   * Get engine timings.
   */
  async getEngineTimings(): Promise<CpuTimings> {
    try {
      const response = await this.transport.unary(
        TimingController.methods[2], // GetEngineTimings method
        GenericVoidValue.create(),
        {} as RpcOptions
      );
      return response.response;
    } catch (err) {
      this.handleError(err, "Error getting engine timings.");
      throw err;
    }
  }

  /**
   * Get timings for a specific track.
   * @param trackId The ID of the track to get timings for.
   */
  async getTrackTimings(trackId: number): Promise<CpuTimings> {
    try {
      const request = TrackIdentifier.create({ id: trackId });
      const response = await this.transport.unary(
        TimingController.methods[3], // GetTrackTimings method
        request,
        {} as RpcOptions
      );
      return response.response;
    } catch (err) {
      this.handleError(err, `Error getting timings for track ID ${trackId}.`);
      throw err;
    }
  }

  /**
   * Get timings for a specific processor.
   * @param processorId The ID of the processor to get timings for.
   */
  async getProcessorTimings(processorId: number): Promise<CpuTimings> {
    try {
      const request = ProcessorIdentifier.create({ id: processorId });
      const response = await this.transport.unary(
        TimingController.methods[4], // GetProcessorTimings method
        request,
        {} as RpcOptions
      );
      return response.response;
    } catch (err) {
      this.handleError(err, `Error getting timings for processor ID ${processorId}.`);
      throw err;
    }
  }

  /**
   * Reset all timings.
   */
  async resetAllTimings(): Promise<void> {
    try {
      await this.transport.unary(
        TimingController.methods[5], // ResetAllTimings method
        GenericVoidValue.create(),
        {} as RpcOptions
      );
      console.log("All timings reset.");
    } catch (err) {
      this.handleError(err, "Error resetting all timings.");
      throw err;
    }
  }

  /**
   * Reset timings for a specific track.
   * @param trackId The ID of the track to reset timings for.
   */
  async resetTrackTimings(trackId: number): Promise<void> {
    try {
      const request = TrackIdentifier.create({ id: trackId });
      await this.transport.unary(
        TimingController.methods[6], // ResetTrackTimings method
        request,
        {} as RpcOptions
      );
      console.log(`Timings reset for track ID ${trackId}.`);
    } catch (err) {
      this.handleError(err, `Error resetting timings for track ID ${trackId}.`);
      throw err;
    }
  }

  /**
   * Reset timings for a specific processor.
   * @param processorId The ID of the processor to reset timings for.
   */
  async resetProcessorTimings(processorId: number): Promise<void> {
    try {
      const request = ProcessorIdentifier.create({ id: processorId });
      await this.transport.unary(
        TimingController.methods[7], // ResetProcessorTimings method
        request,
        {} as RpcOptions
      );
      console.log(`Timings reset for processor ID ${processorId}.`);
    } catch (err) {
      this.handleError(err, `Error resetting timings for processor ID ${processorId}.`);
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

export default SushiTimingController;
