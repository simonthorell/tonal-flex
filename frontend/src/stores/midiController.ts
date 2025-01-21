import {
  MidiController,
  GenericVoidValue,
  GenericIntValue,
  MidiClockSetRequest,
  MidiKbdConnectionList,
  MidiCCConnectionList,
  MidiPCConnectionList,
} from "@/proto/sushi_rpc";
import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";
import type { RpcInterceptor, RpcOptions, UnaryCall, MethodInfo } from "@protobuf-ts/runtime-rpc";
import { RpcError } from "@protobuf-ts/runtime-rpc";

class SushiMidiController {
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
   * Get the number of MIDI input ports.
   */
  async getInputPorts(): Promise<number> {
    const response = await this.transport.unary(
      MidiController.methods[0], // GetInputPorts method
      GenericVoidValue.create(),
      {} as RpcOptions
    );
    return response.response.value;
  }

  /**
   * Get the number of MIDI output ports.
   */
  async getOutputPorts(): Promise<number> {
    const response = await this.transport.unary(
      MidiController.methods[1], // GetOutputPorts method
      GenericVoidValue.create(),
      {} as RpcOptions
    );
    return response.response.value;
  }

  /**
   * Get all keyboard input connections.
   */
  async getAllKbdInputConnections(): Promise<MidiKbdConnectionList> {
    const response = await this.transport.unary(
      MidiController.methods[2], // GetAllKbdInputConnections method
      GenericVoidValue.create(),
      {} as RpcOptions
    );
    return response.response;
  }

  /**
   * Get all keyboard output connections.
   */
  async getAllKbdOutputConnections(): Promise<MidiKbdConnectionList> {
    const response = await this.transport.unary(
      MidiController.methods[3], // GetAllKbdOutputConnections method
      GenericVoidValue.create(),
      {} as RpcOptions
    );
    return response.response;
  }

  /**
   * Get all MIDI CC input connections.
   */
  async getAllCCInputConnections(): Promise<MidiCCConnectionList> {
    const response = await this.transport.unary(
      MidiController.methods[4], // GetAllCCInputConnections method
      GenericVoidValue.create(),
      {} as RpcOptions
    );
    return response.response;
  }

  /**
   * Get all MIDI Program Change (PC) input connections.
   */
  async getAllPCInputConnections(): Promise<MidiPCConnectionList> {
    const response = await this.transport.unary(
      MidiController.methods[5], // GetAllPCInputConnections method
      GenericVoidValue.create(),
      {} as RpcOptions
    );
    return response.response;
  }

  /**
   * Get MIDI clock output enabled state.
   */
  async getMidiClockOutputEnabled(port: number): Promise<boolean> {
    const request = GenericIntValue.create({ value: port });
    const response = await this.transport.unary(
      MidiController.methods[8], // GetMidiClockOutputEnabled method
      request,
      {} as RpcOptions
    );
    return response.response.value;
  }

  /**
   * Set MIDI clock output enabled state.
   */
  async setMidiClockOutputEnabled(port: number, enabled: boolean): Promise<void> {
    const request = MidiClockSetRequest.create({ port, enabled });
    await this.transport.unary(
      MidiController.methods[9], // SetMidiClockOutputEnabled method
      request,
      {} as RpcOptions
    );
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

export default SushiMidiController;
