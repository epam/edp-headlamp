import { ApplicationKubeObjectInterface } from '../../../../k8s/Application/types';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../k8s/EDPCDPipelineStage/types';
import { EDPGitServerKubeObjectInterface } from '../../../../k8s/EDPGitServer/types';
import { PipelineRunKubeObjectInterface } from '../../../../k8s/PipelineRun/types';
import { DataProviderValue } from '../../../../types/pages';

export interface DynamicDataContextProviderValue {
  stage: DataProviderValue<EDPCDPipelineStageKubeObjectInterface>;
  autotestPipelineRuns: DataProviderValue<PipelineRunKubeObjectInterface[]>;
  deployPipelineRuns: DataProviderValue<PipelineRunKubeObjectInterface[]>;
  autotestRunnerPipelineRuns: DataProviderValue<PipelineRunKubeObjectInterface[]>;
  argoApplications: DataProviderValue<ApplicationKubeObjectInterface[]>;
  deployPipelineRunTemplate: DataProviderValue<PipelineRunKubeObjectInterface>;
  gitServers: DataProviderValue<EDPGitServerKubeObjectInterface[]>;
}
