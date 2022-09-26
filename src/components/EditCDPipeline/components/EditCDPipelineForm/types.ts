import { EDPCDPipelineKubeObjectInterface } from '../../../../k8s/EDPCDPipeline/types';
import { DeepPartial } from '../../../../types/global';

export interface EditCDPipelineFormProps {
    handleApply(data: DeepPartial<EDPCDPipelineKubeObjectInterface>): void;
    setDialogOpen(boolean): void;
    CDPipelineData: DeepPartial<EDPCDPipelineKubeObjectInterface>;
}
