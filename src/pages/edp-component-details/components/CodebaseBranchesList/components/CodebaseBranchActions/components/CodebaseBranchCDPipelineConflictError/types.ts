import { EDPCDPipelineKubeObjectInterface } from '../../../../../../../../k8s/EDPCDPipeline/types';

export interface CodebaseBranchCDPipelineConflictErrorProps {
  conflictedCDPipeline: EDPCDPipelineKubeObjectInterface;
  name: string;
}
