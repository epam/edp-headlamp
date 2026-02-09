import { ApplicationKubeObjectInterface } from '../../../../k8s/groups/ArgoCD/Application/types';
import { CDPipelineKubeObjectInterface } from '../../../../k8s/groups/EDP/CDPipeline/types';
import { CodebaseKubeObjectInterface } from '../../../../k8s/groups/EDP/Codebase/types';
import { QuickLinkKubeObjectInterface } from '../../../../k8s/groups/EDP/QuickLink/types';
import { StageKubeObjectInterface } from '../../../../k8s/groups/EDP/Stage/types';
import { KubeObjectListInterface } from '../../../../types/k8s';
import { DataProviderValue } from '../../../../types/pages';

export interface StageWithApplicationsData {
  stage: StageKubeObjectInterface;
  applications: {
    application: CodebaseKubeObjectInterface;
    argoApplication: ApplicationKubeObjectInterface;
  }[];
}

export interface DynamicDataContextProviderValue {
  CDPipeline: DataProviderValue<CDPipelineKubeObjectInterface | null | undefined>;
  stages: DataProviderValue<StageKubeObjectInterface[] | null>;
  stagesWithApplicationsData: DataProviderValue<StageWithApplicationsData[] | null>;
  quickLinksURLs: DataProviderValue<Record<string, string> | undefined>;
  quickLinks: DataProviderValue<KubeObjectListInterface<QuickLinkKubeObjectInterface> | undefined>;
}
