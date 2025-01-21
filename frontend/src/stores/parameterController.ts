import {
  ParameterController,
  TrackIdentifier,
  ProcessorIdentifier,
  ParameterIdRequest,
  ParameterIdentifier,
  ParameterInfoList,
  ParameterInfo,
  ParameterValue,
  PropertyInfoList,
  PropertyIdRequest,
  PropertyIdentifier,
  PropertyInfo,
  PropertyValue,
} from "@/proto/sushi_rpc";
import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";
import type { RpcInterceptor, RpcOptions, UnaryCall, MethodInfo } from "@protobuf-ts/runtime-rpc";
import { RpcError } from "@protobuf-ts/runtime-rpc";

class SushiParameterController {
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

  async getTrackParameters(trackId: number): Promise<ParameterInfoList> {
    const call = await this.transport.unary(
      ParameterController.methods[0], // GetTrackParameters method
      TrackIdentifier.create({ id: trackId }),
      {} as RpcOptions
    );
    return call.response;
  }

  async getProcessorParameters(processorId: number): Promise<ParameterInfoList> {
    const call = await this.transport.unary(
      ParameterController.methods[1], // GetProcessorParameters method
      ProcessorIdentifier.create({ id: processorId }),
      {} as RpcOptions
    );
    return call.response;
  }

  async getParameterId(request: ParameterIdRequest): Promise<ParameterIdentifier> {
    const call = await this.transport.unary(
      ParameterController.methods[2], // GetParameterId method
      request,
      {} as RpcOptions
    );
    return call.response;
  }

  async getParameterInfo(parameterId: ParameterIdentifier): Promise<ParameterInfo> {
    const call = await this.transport.unary(
      ParameterController.methods[3], // GetParameterInfo method
      parameterId,
      {} as RpcOptions
    );
    return call.response;
  }

  async getParameterValue(parameterId: ParameterIdentifier): Promise<number> {
    const call = await this.transport.unary(
      ParameterController.methods[4], // GetParameterValue method
      parameterId,
      {} as RpcOptions
    );
    return call.response.value;
  }

  async getParameterValueInDomain(parameterId: ParameterIdentifier): Promise<number> {
    const call = await this.transport.unary(
      ParameterController.methods[5], // GetParameterValueInDomain method
      parameterId,
      {} as RpcOptions
    );
    return call.response.value;
  }

  async getParameterValueAsString(parameterId: ParameterIdentifier): Promise<string> {
    const call = await this.transport.unary(
      ParameterController.methods[6], // GetParameterValueAsString method
      parameterId,
      {} as RpcOptions
    );
    return call.response.value;
  }

  async setParameterValue(processorId: number, parameterId: number, value: number): Promise<void> {
    const request = ParameterValue.create({
      parameter: ParameterIdentifier.create({ processorId, parameterId }),
      value,
    });
    await this.transport.unary(
      ParameterController.methods[7], // SetParameterValue method
      request,
      {} as RpcOptions
    );
  }

  async getTrackProperties(trackId: number): Promise<PropertyInfoList> {
    const call = await this.transport.unary(
      ParameterController.methods[8], // GetTrackProperties method
      TrackIdentifier.create({ id: trackId }),
      {} as RpcOptions
    );
    return call.response;
  }

  async getProcessorProperties(processorId: number): Promise<PropertyInfoList> {
    const call = await this.transport.unary(
      ParameterController.methods[9], // GetProcessorProperties method
      ProcessorIdentifier.create({ id: processorId }),
      {} as RpcOptions
    );
    return call.response;
  }

  async getPropertyId(request: PropertyIdRequest): Promise<PropertyIdentifier> {
    const call = await this.transport.unary(
      ParameterController.methods[10], // GetPropertyId method
      request,
      {} as RpcOptions
    );
    return call.response;
  }

  async getPropertyInfo(propertyId: PropertyIdentifier): Promise<PropertyInfo> {
    const call = await this.transport.unary(
      ParameterController.methods[11], // GetPropertyInfo method
      propertyId,
      {} as RpcOptions
    );
    return call.response;
  }

  async getPropertyValue(propertyId: PropertyIdentifier): Promise<string> {
    const call = await this.transport.unary(
      ParameterController.methods[12], // GetPropertyValue method
      propertyId,
      {} as RpcOptions
    );
    return call.response.value;
  }

  async setPropertyValue(processorId: number, propertyId: number, value: string): Promise<void> {
    const request = PropertyValue.create({
      property: PropertyIdentifier.create({ processorId, propertyId }),
      value,
    });
    await this.transport.unary(
      ParameterController.methods[13], // SetPropertyValue method
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

export default SushiParameterController;
