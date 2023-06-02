import { EDPCDPipelineStageKubeObjectInterface } from '../../../../k8s/EDPCDPipelineStage/types';

export interface CDPipelineStageContextProviderValue {
    stage: EDPCDPipelineStageKubeObjectInterface;
}

export interface CDPipelineStageContextProviderProps {
    stage: EDPCDPipelineStageKubeObjectInterface;
}
