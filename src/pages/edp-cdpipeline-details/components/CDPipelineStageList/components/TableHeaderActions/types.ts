import { EDPCDPipelineKubeObjectInterface } from '../../../../../../k8s/EDPCDPipeline/types';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../../../k8s/EDPCDPipelineStage/types';

export interface TableHeaderActionsProps {
    CDPipelineData: EDPCDPipelineKubeObjectInterface;
    currentCDPipelineStages: EDPCDPipelineStageKubeObjectInterface[];
}
