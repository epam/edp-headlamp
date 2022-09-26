import { EDPCDPipelineKubeObjectInterface } from '../../k8s/EDPCDPipeline/types';
import { DeepPartial } from '../../types/global';

export interface EditCDPipelineProps {
    open: boolean;
    onClose(): void;
    setOpen(boolean): void;
    CDPipelineData: DeepPartial<EDPCDPipelineKubeObjectInterface>;
}
