import { Stage } from './schema';

export type StageKubeObjectInterface = Stage;

export interface StreamCDPipelineStagesByCDPipelineNameProps {
  namespace: string;
  CDPipelineMetadataName: string;
  dataHandler: (data: StageKubeObjectInterface[]) => void;
  errorHandler: (err: Error) => void;
}

export interface StreamCDPipelineStageProps {
  namespace: string;
  dataHandler: (data: StageKubeObjectInterface) => void;
  errorHandler: (err: Error) => void;
  stageMetadataName: string;
}
