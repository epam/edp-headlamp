import { EDPCDPipelineKubeObjectInterface } from '../../../../k8s/EDPCDPipeline/types';
import { EDPCodebaseKubeObjectInterface } from '../../../../k8s/EDPCodebase/types';

export interface CodebaseCDPipelineConflictErrorProps {
  conflictedCDPipeline: EDPCDPipelineKubeObjectInterface;
  codebase: EDPCodebaseKubeObjectInterface;
}
