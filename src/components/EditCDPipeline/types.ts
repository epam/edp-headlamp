import { EDPCDPipelineKubeObjectInterface } from '../../k8s/EDPCDPipeline/types';

export interface EditCDPipelineProps {
    open: boolean;
    onClose(): void;
    setOpen(boolean): void;
    CDPipelineData: EDPCDPipelineKubeObjectInterface;
}
