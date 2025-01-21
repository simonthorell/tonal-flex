import {
  SessionController,
  GenericVoidValue,
  SessionState,
} from "@/proto/sushi_rpc";
import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";
import type { RpcInterceptor, RpcOptions, UnaryCall, MethodInfo } from "@protobuf-ts/runtime-rpc";
import { RpcError } from "@protobuf-ts/runtime-rpc";

class SushiSessionController {
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
   * Save the current session and return its state.
   */
  async saveSession(): Promise<SessionState> {
    try {
      const response = await this.transport.unary(
        SessionController.methods[0], // SaveSession method
        GenericVoidValue.create(),
        {} as RpcOptions
      );
      console.log("Session saved successfully.");
      return response.response;
    } catch (err) {
      this.handleError(err, "Error saving session.");
      throw err;
    }
  }

  /**
   * Restore a session from the provided state.
   * @param sessionState The session state to restore.
   */
  async restoreSession(sessionState: SessionState): Promise<void> {
    try {
      await this.transport.unary(
        SessionController.methods[1], // RestoreSession method
        sessionState,
        {} as RpcOptions
      );
      console.log("Session restored successfully.");
    } catch (err) {
      this.handleError(err, "Error restoring session.");
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

export default SushiSessionController;
