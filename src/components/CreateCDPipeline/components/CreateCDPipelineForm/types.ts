import { EDPCDPipelineKubeObjectInterface } from '../../../../k8s/EDPCDPipeline/types';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../k8s/EDPCDPipelineStage/types';
import { DeepPartial } from '../../../../types/global';

export interface CreateCDPipelineFormProps {
    editorOpen: boolean;
    setEditorOpen(boolean): void;
    setDialogOpen(boolean): void;
    handleApply(
        newCDPipelineData: DeepPartial<EDPCDPipelineKubeObjectInterface>,
        stages: DeepPartial<EDPCDPipelineStageKubeObjectInterface>[]
    ): void;
    isApplying: boolean;
}
