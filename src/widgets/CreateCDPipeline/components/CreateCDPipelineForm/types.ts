import { EDPCDPipelineKubeObjectInterface } from '../../../../k8s/EDPCDPipeline/types';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../k8s/EDPCDPipelineStage/types';

export interface CreateCDPipelineFormProps {
    editorOpen: boolean;
    setEditorOpen(boolean): void;
    setDialogOpen(boolean): void;
    handleApply({
        CDPipelineData,
        CDPipelineStagesData,
    }: {
        CDPipelineData: EDPCDPipelineKubeObjectInterface;
        CDPipelineStagesData: EDPCDPipelineStageKubeObjectInterface[];
    }): void;
    isApplying: boolean;
}
