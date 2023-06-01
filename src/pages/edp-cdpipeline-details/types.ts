import { EDPCDPipelineStageKubeObjectInterface } from '../../k8s/EDPCDPipelineStage/types';

export interface CDPipelinePageDataProviderProps {
    namespace: string;
    name: string;
}

export interface StageDataProviderProps {
    stage: EDPCDPipelineStageKubeObjectInterface;
}
