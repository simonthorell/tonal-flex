// Import necessary enums and types from sushi_rpc.ts
import {
  PlayingMode_Mode as PlayingMode,
  SyncMode_Mode as SyncMode,
  ParameterType_Type as ParameterType,
  PluginType_Type as PluginType,
  TrackType_Type as TrackType,
  SushiBuildInfo as GrpcSushiBuildInfo,
  ParameterInfo as GrpcParameterInfo,
  PropertyInfo as GrpcPropertyInfo,
  ProcessorInfo as GrpcProcessorInfo,
  TrackInfo as GrpcTrackInfo,
  ProgramInfo as GrpcProgramInfo,
  ProcessorState as GrpcProcessorState,
  AudioConnection as GrpcAudioConnection,
  MidiKbdConnection as GrpcMidiKbdConnection,
  MidiCCConnection as GrpcMidiCCConnection,
  MidiPCConnection as GrpcMidiPCConnection,
  CvConnection as GrpcCvConnection,
  GateConnection as GrpcGateConnection,
} from '@/proto/sushi_rpc';

// Enum mappings
export enum SushiPlayingMode {
  STOPPED = PlayingMode.STOPPED,
  PLAYING = PlayingMode.PLAYING,
  RECORDING = PlayingMode.RECORDING,
}

export enum SushiSyncMode {
  INTERNAL = SyncMode.INTERNAL,
  MIDI = SyncMode.MIDI,
  LINK = SyncMode.LINK,
}

export enum SushiParameterType {
  DUMMY = ParameterType.DUMMY,
  BOOL = ParameterType.BOOL,
  INT = ParameterType.INT,
  FLOAT = ParameterType.FLOAT,
}

export enum SushiPluginType {
  INTERNAL = PluginType.INTERNAL,
  VST2X = PluginType.VST2X,
  VST3X = PluginType.VST3X,
  LV2 = PluginType.LV2,
}

export enum SushiTrackType {
  REGULAR = TrackType.REGULAR,
  PRE = TrackType.PRE,
  POST = TrackType.POST,
}

// Class definitions
export class SushiBuildInfo {
  version: string;
  buildOptions: string[];
  audioBufferSize: number;
  commitHash: string;
  buildDate: string;

  constructor(grpcInfo?: GrpcSushiBuildInfo) {
    this.version = grpcInfo?.version || '';
    this.buildOptions = grpcInfo?.buildOptions || [];
    this.audioBufferSize = grpcInfo?.audioBufferSize || -1;
    this.commitHash = grpcInfo?.commitHash || '';
    this.buildDate = grpcInfo?.buildDate || '1-1-1970';
  }
}

export class SushiParameterInfo {
  id: number;
  type: SushiParameterType;
  label: string;
  name: string;
  unit: string;
  automatable: boolean;
  minDomainValue: number;
  maxDomainValue: number;

  constructor(grpcInfo: GrpcParameterInfo) {
    this.id = grpcInfo?.id || 0;
    this.type = (grpcInfo?.type?.type as unknown as SushiParameterType) || SushiParameterType.DUMMY;
    this.label = grpcInfo?.label || '';
    this.name = grpcInfo?.name || '';
    this.unit = grpcInfo?.unit || '';
    this.automatable = grpcInfo?.automatable || false;
    this.minDomainValue = grpcInfo?.minDomainValue || 0.0;
    this.maxDomainValue = grpcInfo?.maxDomainValue || 0.0;
  }
}

export class SushiPropertyInfo {
  id: number;
  label: string;
  name: string;

  constructor(grpcInfo?: GrpcPropertyInfo) {
    this.id = grpcInfo?.id || 0;
    this.label = grpcInfo?.label || '';
    this.name = grpcInfo?.name || '';
  }
}

export class SushiProcessorInfo {
  id: number;
  label: string;
  name: string;
  parameterCount: number;
  programCount: number;

  constructor(grpcInfo?: GrpcProcessorInfo) {
    this.id = grpcInfo?.id || 0;
    this.label = grpcInfo?.label || '';
    this.name = grpcInfo?.name || '';
    this.parameterCount = grpcInfo?.parameterCount || 0;
    this.programCount = grpcInfo?.programCount || 0;
  }
}

export class SushiTrackInfo {
  id: number;
  type: SushiTrackType;
  label: string;
  name: string;
  channels: number;
  buses: number;

  constructor(grpcInfo: GrpcTrackInfo) {
    this.id = grpcInfo?.id || 0;
    this.type = this.mapTrackType(grpcInfo?.type?.type) || SushiTrackType.REGULAR; // Use a mapping function
    this.label = grpcInfo?.label || "";
    this.name = grpcInfo?.name || "";
    this.channels = grpcInfo?.channels || 0;
    this.buses = grpcInfo?.buses || 0;
  }

  /**
   * Maps TrackType_Type to SushiTrackType
   */
  private mapTrackType(grpcType?: TrackType): SushiTrackType | undefined {
    switch (grpcType) {
      case TrackType.REGULAR:
        return SushiTrackType.REGULAR;
      case TrackType.PRE:
        return SushiTrackType.PRE;
      case TrackType.POST:
        return SushiTrackType.POST;
      default:
        return undefined; // Fallback for undefined or unsupported types
    }
  }
}

export class SushiProgramInfo {
  id: number;
  name: string;

  constructor(grpcInfo?: GrpcProgramInfo) {
    this.id = grpcInfo?.id?.program || 0;
    this.name = grpcInfo?.name || '';
  }
}

export class SushiProcessorState {
  programId: number | null;
  bypassed: boolean | null;
  properties: [string, string][];
  parameters: [number, number][];
  binaryData: Uint8Array;

  constructor(grpcState?: GrpcProcessorState) {
    this.programId = grpcState?.programId?.value || null;
    this.bypassed = grpcState?.bypassed?.value || null;

    // Safely map properties
    this.properties =
      grpcState?.properties?.map((p) => {
        const id = p.property?.propertyId?.toString() || 'unknown'; // Ensure id is a string
        const value = p.value || '';
        return [id, value];
      }) || [];

    // Safely map parameters
    this.parameters =
      grpcState?.parameters?.map((p) => {
        const parameterId = p.parameter?.parameterId || -1;
        const value = p.value || 0;
        return [parameterId, value];
      }) || [];

    this.binaryData = grpcState?.binaryData || new Uint8Array();
  }
}

export class SushiAudioConnection {
  track: number;
  trackChannel: number;
  engineChannel: number;

  constructor(grpcConn?: GrpcAudioConnection) {
    this.track = grpcConn?.track?.id || 0;
    this.trackChannel = grpcConn?.trackChannel || 0;
    this.engineChannel = grpcConn?.engineChannel || 0;
  }
}

export class SushiMidiKbdConnection {
  track: number;
  channel: number;
  port: number;
  rawMidi: boolean;

  constructor(grpcConn?: GrpcMidiKbdConnection) {
    this.track = grpcConn?.track?.id || 0;
    this.channel = grpcConn?.channel?.channel || 0;
    this.port = grpcConn?.port || 0;
    this.rawMidi = grpcConn?.rawMidi || false;
  }
}

export class SushiMidiCCConnection {
  processorId: number;
  parameterId: number;
  channel: number;
  port: number;
  ccNumber: number;
  minRange: number;
  maxRange: number;
  relativeMode: boolean;

  constructor(grpcConn?: GrpcMidiCCConnection) {
    this.processorId = grpcConn?.parameter?.processorId || 0;
    this.parameterId = grpcConn?.parameter?.parameterId || 0;
    this.channel = grpcConn?.channel?.channel || 0;
    this.port = grpcConn?.port || 0;
    this.ccNumber = grpcConn?.ccNumber || 0;
    this.minRange = grpcConn?.minRange || 0.0;
    this.maxRange = grpcConn?.maxRange || 0.0;
    this.relativeMode = grpcConn?.relativeMode || false;
  }
}

export class SushiMidiPCConnection {
  processor: number;
  channel: number;
  port: number;

  constructor(grpcConn?: GrpcMidiPCConnection) {
    this.processor = grpcConn?.processor?.id || 0;
    this.channel = grpcConn?.channel?.channel || 0;
    this.port = grpcConn?.port || 0;
  }
}

export class SushiCvConnection {
  processorId: number;
  parameterId: number;
  cvPortId: number;

  constructor(grpcConn?: GrpcCvConnection) {
    this.processorId = grpcConn?.parameter?.processorId || 0;
    this.parameterId = grpcConn?.parameter?.parameterId || 0;
    this.cvPortId = grpcConn?.cvPortId || 0;
  }
}

export class SushiGateConnection {
  processorId: number;
  gatePortId: number;
  channel: number;
  noteNo: number;

  constructor(grpcConn?: GrpcGateConnection) {
    this.processorId = grpcConn?.processor?.id || 0;
    this.gatePortId = grpcConn?.gatePortId || 0;
    this.channel = grpcConn?.channel || 0;
    this.noteNo = grpcConn?.noteNo || 0;
  }
}
