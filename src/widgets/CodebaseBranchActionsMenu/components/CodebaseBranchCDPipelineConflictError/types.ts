import { CDPipelineKubeObjectInterface } from '../../../../k8s/groups/EDP/CDPipeline/types';

export interface CodebaseBranchCDPipelineConflictErrorProps {
  conflictedCDPipeline: CDPipelineKubeObjectInterface;
  name: string;
}
