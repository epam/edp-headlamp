import { EDPCDPipelineStageKubeObjectInterface } from '../../../../../k8s/EDPCDPipelineStage/types';

export interface StagesProps {
    stages: EDPCDPipelineStageKubeObjectInterface[];
    handleDeleteStage: (idx: number) => void;
    handleClickAddStage: () => void;
}
