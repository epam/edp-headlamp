import { CodebaseKubeObjectInterface } from '../../../../../../../../k8s/groups/EDP/Codebase/types';
import { PipelineRunKubeObjectInterface } from '../../../../../../../../k8s/groups/Tekton/PipelineRun/types';

export interface DetailsProps {
  codebaseData: CodebaseKubeObjectInterface;
  pipelineRuns: {
    all: PipelineRunKubeObjectInterface[];
    latestBuildPipelineRun: PipelineRunKubeObjectInterface;
  };
}
