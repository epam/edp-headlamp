import { EDPCDPipelineStageKubeObjectInterface } from '../../../../k8s/EDPCDPipelineStage/types';

export interface EditCodebaseFormProps {
    handleApply({
        CDPipelineStageData,
    }: {
        CDPipelineStageData: EDPCDPipelineStageKubeObjectInterface;
    }): void;
    setDialogOpen(boolean): void;
    CDPipelineStageData: EDPCDPipelineStageKubeObjectInterface;
}
