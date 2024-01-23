import { EDPCDPipelineKubeObjectInterface } from '../../k8s/EDPCDPipeline/types';
import { EDPCDPipelineStageKubeObjectInterface } from '../../k8s/EDPCDPipelineStage/types';

export interface StageActionsMenuProps {
  stages: EDPCDPipelineStageKubeObjectInterface[];
  CDPipelineData: EDPCDPipelineKubeObjectInterface;
}
