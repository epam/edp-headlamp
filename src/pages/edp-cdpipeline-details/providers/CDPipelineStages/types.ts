import { EDPCDPipelineStageKubeObjectInterface } from '../../../../k8s/EDPCDPipelineStage/types';

export interface CDPipelineStagesContextProviderValue {
    stages: EDPCDPipelineStageKubeObjectInterface[];
}
