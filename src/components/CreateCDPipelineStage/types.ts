import { EDPCDPipelineKubeObjectInterface } from '../../k8s/EDPCDPipeline/types';
import { EDPCDPipelineStageKubeObjectInterface } from '../../k8s/EDPCDPipelineStage/types';
import { DeepPartial } from '../../types/global';

export interface CreateCDPipelineStageProps {
    availableCITools: string[];
    CDPipelineData: DeepPartial<EDPCDPipelineKubeObjectInterface>;
    otherStages: DeepPartial<EDPCDPipelineStageKubeObjectInterface>[];
    open: boolean;
    onClose(): void;
    setOpen(boolean): void;
    handleApply: (stage: DeepPartial<EDPCDPipelineStageKubeObjectInterface>) => void;
    isApplying: boolean;
}
