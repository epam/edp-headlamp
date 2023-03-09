import { EDPCDPipelineKubeObjectInterface } from '../../k8s/EDPCDPipeline/types';
import { EDPCDPipelineStageKubeObjectInterface } from '../../k8s/EDPCDPipelineStage/types';

export interface CreateCDPipelineStageProps {
    availableCITools: string[];
    CDPipelineData: EDPCDPipelineKubeObjectInterface;
    otherStages: EDPCDPipelineStageKubeObjectInterface[];
    open: boolean;
    onClose(): void;
    setOpen(boolean): void;
    handleApply: ({
        CDPipelineStageData,
    }: {
        CDPipelineStageData: EDPCDPipelineStageKubeObjectInterface;
    }) => void;
    isApplying: boolean;
}
