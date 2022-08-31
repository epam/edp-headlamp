import { EDPCDPipelineKubeObjectInterface } from '../../../../k8s/EDPCDPipeline/types';
import { DeepPartial } from '../../../../types/global';
import { EDPKubeObjectInterface } from '../../../../types/k8s';

export interface CreateCDPipelineFormProps {
    editorOpen: boolean;
    setEditorOpen(boolean): void;
    setDialogOpen(boolean): void;
    handleApply(
        newCDPipelineData: DeepPartial<EDPCDPipelineKubeObjectInterface>,
        stages: DeepPartial<EDPKubeObjectInterface>[]
    ): void;
}
