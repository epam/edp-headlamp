import { EDPCDPipelineStageKubeObjectInterface } from '../../k8s/EDPCDPipelineStage/types';

export interface EditCodebaseProps {
    open: boolean;
    onClose(): void;
    setOpen(boolean): void;
    CDPipelineStageData: EDPCDPipelineStageKubeObjectInterface;
}
