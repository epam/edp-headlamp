import { ApplicationKubeObjectInterface } from '../../../../k8s/groups/ArgoCD/Application/types';
import { ConfigMapKubeObjectInterface } from '../../../../k8s/groups/default/ConfigMap/types';
import { PodKubeObjectInterface } from '../../../../k8s/groups/default/Pod/types';
import { GitServerKubeObjectInterface } from '../../../../k8s/groups/EDP/GitServer/types';
import { StageKubeObjectInterface } from '../../../../k8s/groups/EDP/Stage/types';
import { PipelineRunKubeObjectInterface } from '../../../../k8s/groups/Tekton/PipelineRun/types';
import { DataProviderValue } from '../../../../types/pages';

export interface DynamicDataContextProviderValue {
  stage: DataProviderValue<StageKubeObjectInterface | undefined>;
  pipelineRuns: DataProviderValue<PipelineRunKubeObjectInterface[] | null>;
  deployPipelineRuns: DataProviderValue<PipelineRunKubeObjectInterface[] | null>;
  cleanPipelineRuns: DataProviderValue<PipelineRunKubeObjectInterface[] | null>;
  argoApplications: DataProviderValue<ApplicationKubeObjectInterface[] | null>;
  deployPipelineRunTemplate: DataProviderValue<PipelineRunKubeObjectInterface | undefined>;
  cleanPipelineRunTemplate: DataProviderValue<PipelineRunKubeObjectInterface | undefined>;
  gitServers: DataProviderValue<GitServerKubeObjectInterface[] | null>;
  newPipelineRunAdded: boolean;
  setNewPipelineRunAdded: React.Dispatch<React.SetStateAction<boolean>>;
  variablesConfigMap: DataProviderValue<ConfigMapKubeObjectInterface | null | undefined>;
  applicationPodsMap: DataProviderValue<Record<string, PodKubeObjectInterface[]> | null>;
}
