import { EDPCDPipelineKubeObjectInterface } from '../../../../k8s/EDPCDPipeline/types';

export interface EditCDPipelineFormProps {
    handleApply({ CDPipelineData }: { CDPipelineData: EDPCDPipelineKubeObjectInterface }): void;
    setDialogOpen(boolean): void;
    CDPipelineData: EDPCDPipelineKubeObjectInterface;
}
