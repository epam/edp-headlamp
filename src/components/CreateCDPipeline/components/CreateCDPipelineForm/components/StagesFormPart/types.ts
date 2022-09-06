import { EDPCDPipelineStageKubeObjectInterface } from '../../../../../../k8s/EDPCDPipelineStage/types';
import { DeepPartial } from '../../../../../../types/global';

export interface StagesFormPartProps {
    setCreateStageDialogOpen: () => void;
    stages: DeepPartial<EDPCDPipelineStageKubeObjectInterface>;
    onStageDelete: (idx: number) => void;
}
