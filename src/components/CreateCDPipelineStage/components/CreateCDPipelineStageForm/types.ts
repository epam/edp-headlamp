import { EDPCDPipelineKubeObjectInterface } from '../../../../k8s/EDPCDPipeline/types';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../k8s/EDPCDPipelineStage/types';
import { DeepPartial } from '../../../../types/global';

export interface CreateCDPipelineStageFormProps {
    availableCITools: string[];
    CDPipelineData: DeepPartial<EDPCDPipelineKubeObjectInterface>;
    stagesQuantity: number;
    editorOpen: boolean;
    setEditorOpen(boolean): void;
    setDialogOpen(boolean): void;
    handleApply: (stage: DeepPartial<EDPCDPipelineStageKubeObjectInterface>) => void;
    isApplying: boolean;
}
