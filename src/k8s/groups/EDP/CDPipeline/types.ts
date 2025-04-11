import { CDPipeline } from './schema';

export type CDPipelineKubeObjectInterface = CDPipeline;

export interface StreamCDPipelineProps {
  namespace: string;
  CDPipelineMetadataName: string;
  dataHandler: (data: CDPipelineKubeObjectInterface) => void;
  errorHandler: (err: Error) => void;
}
