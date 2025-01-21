import {
  CvGateController,
  GenericVoidValue,
  GenericIntValue,
  ProcessorIdentifier,
  CvConnection,
  GateConnection,
  CvConnectionList,
  GateConnectionList,
} from "@/proto/sushi_rpc";
import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";
import type { RpcInterceptor, RpcOptions, UnaryCall, MethodInfo } from "@protobuf-ts/runtime-rpc";
import { RpcError } from "@protobuf-ts/runtime-rpc";

class SushiCvGateController {
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

  private async unaryCall<I, O>(methodIndex: number, input: I): Promise<O> {
    try {
      const call = await this.transport.unary(
        CvGateController.methods[methodIndex],
        input,
        {} as RpcOptions
      );
      return call.response;
    } catch (err) {
      this.handleError(err);
      throw err;
    }
  }

  async getCvInputChannelCount(): Promise<number> {
    const response = await this.unaryCall<GenericVoidValue, GenericIntValue>(0, GenericVoidValue.create());
    return response.value;
  }

  async getCvOutputChannelCount(): Promise<number> {
    const response = await this.unaryCall<GenericVoidValue, GenericIntValue>(1, GenericVoidValue.create());
    return response.value;
  }

  async getAllCvInputConnections(): Promise<CvConnection[]> {
    const response = await this.unaryCall<GenericVoidValue, CvConnectionList>(2, GenericVoidValue.create());
    return response.connections;
  }

  async getAllCvOutputConnections(): Promise<CvConnection[]> {
    const response = await this.unaryCall<GenericVoidValue, CvConnectionList>(3, GenericVoidValue.create());
    return response.connections;
  }

  async getAllGateInputConnections(): Promise<GateConnection[]> {
    const response = await this.unaryCall<GenericVoidValue, GateConnectionList>(4, GenericVoidValue.create());
    return response.connections;
  }

  async getAllGateOutputConnections(): Promise<GateConnection[]> {
    const response = await this.unaryCall<GenericVoidValue, GateConnectionList>(5, GenericVoidValue.create());
    return response.connections;
  }

  async getCvInputConnectionsForProcessor(processorId: number): Promise<CvConnection[]> {
    const response = await this.unaryCall<ProcessorIdentifier, CvConnectionList>(6, ProcessorIdentifier.create({ id: processorId }));
    return response.connections;
  }

  async getCvOutputConnectionsForProcessor(processorId: number): Promise<CvConnection[]> {
    const response = await this.unaryCall<ProcessorIdentifier, CvConnectionList>(7, ProcessorIdentifier.create({ id: processorId }));
    return response.connections;
  }

  async getGateInputConnectionsForProcessor(processorId: number): Promise<GateConnection[]> {
    const response = await this.unaryCall<ProcessorIdentifier, GateConnectionList>(8, ProcessorIdentifier.create({ id: processorId }));
    return response.connections;
  }

  async getGateOutputConnectionsForProcessor(processorId: number): Promise<GateConnection[]> {
    const response = await this.unaryCall<ProcessorIdentifier, GateConnectionList>(9, ProcessorIdentifier.create({ id: processorId }));
    return response.connections;
  }

  async connectCvInputToParameter(connection: CvConnection): Promise<void> {
    await this.unaryCall<CvConnection, GenericVoidValue>(10, connection);
  }

  async connectCvOutputFromParameter(connection: CvConnection): Promise<void> {
    await this.unaryCall<CvConnection, GenericVoidValue>(11, connection);
  }

  async connectGateInputToProcessor(connection: GateConnection): Promise<void> {
    await this.unaryCall<GateConnection, GenericVoidValue>(12, connection);
  }

  async connectGateOutputFromProcessor(connection: GateConnection): Promise<void> {
    await this.unaryCall<GateConnection, GenericVoidValue>(13, connection);
  }

  async disconnectCvInput(connection: CvConnection): Promise<void> {
    await this.unaryCall<CvConnection, GenericVoidValue>(14, connection);
  }

  async disconnectCvOutput(connection: CvConnection): Promise<void> {
    await this.unaryCall<CvConnection, GenericVoidValue>(15, connection);
  }

  async disconnectGateInput(connection: GateConnection): Promise<void> {
    await this.unaryCall<GateConnection, GenericVoidValue>(16, connection);
  }

  async disconnectGateOutput(connection: GateConnection): Promise<void> {
    await this.unaryCall<GateConnection, GenericVoidValue>(17, connection);
  }

  async disconnectAllCvInputsFromProcessor(processorId: number): Promise<void> {
    await this.unaryCall<ProcessorIdentifier, GenericVoidValue>(18, ProcessorIdentifier.create({ id: processorId }));
  }

  async disconnectAllCvOutputsFromProcessor(processorId: number): Promise<void> {
    await this.unaryCall<ProcessorIdentifier, GenericVoidValue>(19, ProcessorIdentifier.create({ id: processorId }));
  }

  async disconnectAllGateInputsFromProcessor(processorId: number): Promise<void> {
    await this.unaryCall<ProcessorIdentifier, GenericVoidValue>(20, ProcessorIdentifier.create({ id: processorId }));
  }

  async disconnectAllGateOutputsFromProcessor(processorId: number): Promise<void> {
    await this.unaryCall<ProcessorIdentifier, GenericVoidValue>(21, ProcessorIdentifier.create({ id: processorId }));
  }

  private handleError(err: unknown): void {
    if (err instanceof RpcError) {
      console.error(`gRPC error: ${err.message}`);
    } else {
      console.error("Unknown error", err);
    }
  }
}

export default SushiCvGateController;
