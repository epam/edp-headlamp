import { EDPCDPipelineStageKubeObjectInterface } from '../../../../../../../k8s/EDPCDPipelineStage/types';
import { DeepPartial } from '../../../../../../../types/global';

export interface StagesProps {
    stages: DeepPartial<EDPCDPipelineStageKubeObjectInterface>;
    setCreateStageDialogOpen: () => void;
    onStageDelete: (idx: number) => void;
}
