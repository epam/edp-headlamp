import { ApplicationKubeObjectInterface } from '../../../../k8s/Application/types';
import { EDPCDPipelineKubeObjectInterface } from '../../../../k8s/EDPCDPipeline/types';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../k8s/EDPCDPipelineStage/types';
import { EDPCodebaseKubeObjectInterface } from '../../../../k8s/EDPCodebase/types';

export interface DataProviderValue<T> {
    data: T;
    error: unknown;
    isLoading: boolean;
}

export interface StageWithApplicationsData {
    stage: EDPCDPipelineStageKubeObjectInterface;
    applications: {
        application: EDPCodebaseKubeObjectInterface;
        argoApplication: ApplicationKubeObjectInterface;
    }[];
}

export interface DynamicDataContextProviderValue {
    CDPipeline: DataProviderValue<EDPCDPipelineKubeObjectInterface>;
    stages: DataProviderValue<EDPCDPipelineStageKubeObjectInterface[]>;
    stagesWithApplicationsData: DataProviderValue<StageWithApplicationsData[]>;
}
