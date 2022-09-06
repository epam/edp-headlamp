import { EDPCDPipelineKubeObjectInterface } from '../../k8s/EDPCDPipeline/types';
import { DeepPartial } from '../../types/global';
import { EDPKubeObjectInterface } from '../../types/k8s';

export interface CreateCDPipelineProps {
    open: boolean;
    onClose(): void;
    setOpen(boolean): void;
    handleApply(
        newCDPipelineData: DeepPartial<EDPCDPipelineKubeObjectInterface>,
        stages: DeepPartial<EDPKubeObjectInterface>[]
    ): void;
}
