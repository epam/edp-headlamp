import { CDPipelineKubeObjectInterface } from '../../../../k8s/groups/EDP/CDPipeline/types';
import { CodebaseKubeObjectInterface } from '../../../../k8s/groups/EDP/Codebase/types';
import { StageKubeObjectInterface } from '../../../../k8s/groups/EDP/Stage/types';

export type ComponentsToDeleteConflicts = Map<
  string,
  {
    component: CodebaseKubeObjectInterface;
    pipelines: CDPipelineKubeObjectInterface[];
    stages: StageKubeObjectInterface[];
  }
>;

export type ComponentsToDelete = Map<string, CodebaseKubeObjectInterface>;
