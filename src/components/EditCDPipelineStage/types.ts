import { EDPCDPipelineStageKubeObjectInterface } from '../../k8s/EDPCDPipelineStage/types';
import { DeepPartial } from '../../types/global';

export interface EditCodebaseProps {
    open: boolean;
    onClose(): void;
    setOpen(boolean): void;
    CDPipelineStageData: DeepPartial<EDPCDPipelineStageKubeObjectInterface>;
}
