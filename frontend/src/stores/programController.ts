import {
  ProgramController,
  ProcessorIdentifier,
  ProgramIdentifier,
  ProcessorProgramIdentifier,
  ProgramInfoList,
  ProcessorProgramSetRequest,
} from "@/proto/sushi_rpc";
import { ProgramControllerClient } from "@/proto/sushi_rpc.client";
import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";
import type { RpcInterceptor, RpcOptions, UnaryCall, MethodInfo } from "@protobuf-ts/runtime-rpc";
import { RpcError } from "@protobuf-ts/runtime-rpc";

class SushiProgramController {
  private transport: GrpcWebFetchTransport;
  private controller: ProgramControllerClient;

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

    this.controller = new ProgramControllerClient(this.transport);
  }

  /**
   * Get the current program of a processor.
   */
  async getProcessorCurrentProgram(processorId: number): Promise<ProgramIdentifier> {
    try {
      const response = await this.transport.unary(
        ProgramController.methods[0], // GetProcessorCurrentProgram
        ProcessorIdentifier.create({ id: processorId }),
        {} as RpcOptions
      );
      return response.response;
    } catch (err) {
      this.handleError(err, `Error getting current program for processor ID ${processorId}`);
      throw err;
    }
  }

  /**
   * Get the current program name of a processor.
   */
  async getProcessorCurrentProgramName(processorId: number): Promise<string> {
    try {
      const response = await this.transport.unary(
        ProgramController.methods[1], // GetProcessorCurrentProgramName
        ProcessorIdentifier.create({ id: processorId }),
        {} as RpcOptions
      );
      return response.response.value;
    } catch (err) {
      this.handleError(err, `Error getting current program name for processor ID ${processorId}`);
      throw err;
    }
  }

  /**
   * Get a specific program name for a processor.
   */
  async getProcessorProgramName(processorId: number, programId: number): Promise<string> {
    try {
      const response = await this.transport.unary(
        ProgramController.methods[2], // GetProcessorProgramName
        ProcessorProgramIdentifier.create({
          processor: { id: processorId },
          program: programId,
        }),
        {} as RpcOptions
      );
      return response.response.value;
    } catch (err) {
      this.handleError(
        err,
        `Error getting program name for processor ID ${processorId}, program ID ${programId}`
      );
      throw err;
    }
  }

  /**
   * Get all programs for a processor.
   */
  async getProcessorPrograms(processorId: number): Promise<ProgramInfoList> {
    try {
      const response = await this.transport.unary(
        ProgramController.methods[3], // GetProcessorPrograms
        ProcessorIdentifier.create({ id: processorId }),
        {} as RpcOptions
      );
      return response.response;
    } catch (err) {
      this.handleError(err, `Error getting programs for processor ID ${processorId}`);
      throw err;
    }
  }

  /**
   * Set the program for a processor.
   */
  async setProcessorProgram(processorId: number, programId: number): Promise<void> {
    try {
      const request = ProcessorProgramSetRequest.create({
        processor: ProcessorIdentifier.create({ id: processorId }),
        program: ProgramIdentifier.create({ program: programId }), // Correctly wrap programId in ProgramIdentifier
      });
      await this.transport.unary(
        ProgramController.methods[4], // SetProcessorProgram
        request,
        {} as RpcOptions
      );
      console.log(
        `Set program ID ${programId} for processor ID ${processorId}.`
      );
    } catch (err) {
      this.handleError(
        err,
        `Error setting program ID ${programId} for processor ID ${processorId}`
      );
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

export default SushiProgramController;
