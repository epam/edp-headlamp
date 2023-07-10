import { EDPCDPipelineKubeObjectInterface } from '../../../../k8s/EDPCDPipeline/types';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../k8s/EDPCDPipelineStage/types';

export interface CreateCDPipelineStageFormProps {
    CDPipelineData: EDPCDPipelineKubeObjectInterface;
    otherStages: EDPCDPipelineStageKubeObjectInterface[];
    editorOpen: boolean;
    setEditorOpen(boolean): void;
    setDialogOpen(boolean): void;
    handleApply: ({
        CDPipelineStageData,
    }: {
        CDPipelineStageData: EDPCDPipelineStageKubeObjectInterface;
    }) => void;
    isApplying: boolean;
}
