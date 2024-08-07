import { ApplicationKubeObjectInterface } from '../../../../k8s/groups/ArgoCD/Application/types';
import { GitServerKubeObjectInterface } from '../../../../k8s/groups/EDP/GitServer/types';
import { StageKubeObjectInterface } from '../../../../k8s/groups/EDP/Stage/types';
import { PipelineRunKubeObjectInterface } from '../../../../k8s/groups/Tekton/PipelineRun/types';
import { DataProviderValue } from '../../../../types/pages';

export interface DynamicDataContextProviderValue {
  stage: DataProviderValue<StageKubeObjectInterface>;
  pipelineRuns: DataProviderValue<PipelineRunKubeObjectInterface[]>;
  deployPipelineRuns: DataProviderValue<PipelineRunKubeObjectInterface[]>;
  cleanPipelineRuns: DataProviderValue<PipelineRunKubeObjectInterface[]>;
  argoApplications: DataProviderValue<ApplicationKubeObjectInterface[]>;
  deployPipelineRunTemplate: DataProviderValue<PipelineRunKubeObjectInterface>;
  cleanPipelineRunTemplate: DataProviderValue<PipelineRunKubeObjectInterface>;
  gitServers: DataProviderValue<GitServerKubeObjectInterface[]>;
}
