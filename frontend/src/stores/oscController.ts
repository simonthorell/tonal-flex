import {
  OscController,
  GenericVoidValue,
  OscParameterOutputList,
  ParameterIdentifier,
} from "@/proto/sushi_rpc";
import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";
import type { RpcInterceptor, RpcOptions, UnaryCall, MethodInfo } from "@protobuf-ts/runtime-rpc";
import { RpcError } from "@protobuf-ts/runtime-rpc";

class SushiOscController {
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
   * Get the send IP address.
   */
  async getSendIP(): Promise<string> {
    const call = await this.transport.unary(
      OscController.methods[0], // GetSendIP method
      GenericVoidValue.create(),
      {} as RpcOptions
    );
    return call.response.value;
  }

  /**
   * Get the send port.
   */
  async getSendPort(): Promise<number> {
    const call = await this.transport.unary(
      OscController.methods[1], // GetSendPort method
      GenericVoidValue.create(),
      {} as RpcOptions
    );
    return call.response.value;
  }

  /**
   * Get the receive port.
   */
  async getReceivePort(): Promise<number> {
    const call = await this.transport.unary(
      OscController.methods[2], // GetReceivePort method
      GenericVoidValue.create(),
      {} as RpcOptions
    );
    return call.response.value;
  }

  /**
   * Get all enabled parameter outputs.
   */
  async getEnabledParameterOutputs(): Promise<OscParameterOutputList> {
    const call = await this.transport.unary(
      OscController.methods[3], // GetEnabledParameterOutputs method
      GenericVoidValue.create(),
      {} as RpcOptions
    );
    return call.response;
  }

  /**
   * Enable output for a specific parameter.
   */
  async enableOutputForParameter(processorId: number, parameterId: number): Promise<void> {
    const request = ParameterIdentifier.create({
      processorId,
      parameterId,
    });
    await this.transport.unary(
      OscController.methods[4], // EnableOutputForParameter method
      request,
      {} as RpcOptions
    );
  }

  /**
   * Disable output for a specific parameter.
   */
  async disableOutputForParameter(processorId: number, parameterId: number): Promise<void> {
    const request = ParameterIdentifier.create({
      processorId,
      parameterId,
    });
    await this.transport.unary(
      OscController.methods[5], // DisableOutputForParameter method
      request,
      {} as RpcOptions
    );
  }

  /**
   * Enable output for all parameters.
   */
  async enableAllOutput(): Promise<void> {
    await this.transport.unary(
      OscController.methods[6], // EnableAllOutput method
      GenericVoidValue.create(),
      {} as RpcOptions
    );
  }

  /**
   * Disable output for all parameters.
   */
  async disableAllOutput(): Promise<void> {
    await this.transport.unary(
      OscController.methods[7], // DisableAllOutput method
      GenericVoidValue.create(),
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

export default SushiOscController;
