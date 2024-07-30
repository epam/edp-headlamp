import { ApplicationKubeObjectInterface } from '../../../../k8s/groups/ArgoCD/Application/types';
import { CDPipelineKubeObjectInterface } from '../../../../k8s/groups/EDP/CDPipeline/types';
import { CodebaseKubeObjectInterface } from '../../../../k8s/groups/EDP/Codebase/types';
import { StageKubeObjectInterface } from '../../../../k8s/groups/EDP/Stage/types';
import { DataProviderValue } from '../../../../types/pages';

export interface StageWithApplicationsData {
  stage: StageKubeObjectInterface;
  applications: {
    application: CodebaseKubeObjectInterface;
    argoApplication: ApplicationKubeObjectInterface;
  }[];
}

export interface DynamicDataContextProviderValue {
  CDPipeline: DataProviderValue<CDPipelineKubeObjectInterface>;
  stages: DataProviderValue<StageKubeObjectInterface[]>;
  stagesWithApplicationsData: DataProviderValue<StageWithApplicationsData[]>;
}
