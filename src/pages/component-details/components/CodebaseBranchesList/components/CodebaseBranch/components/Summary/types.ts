import { CodebaseKubeObjectInterface } from '../../../../../../../../k8s/groups/EDP/Codebase/types';
import { CodebaseBranchKubeObjectInterface } from '../../../../../../../../k8s/groups/EDP/CodebaseBranch/types';
import { PipelineRunKubeObjectInterface } from '../../../../../../../../k8s/groups/Tekton/PipelineRun/types';

export interface SummaryProps {
  codebaseBranchData: CodebaseBranchKubeObjectInterface;
  codebaseData: CodebaseKubeObjectInterface;
  pipelineRuns: {
    all: PipelineRunKubeObjectInterface[];
    latestBuildPipelineRun: PipelineRunKubeObjectInterface;
  };
  defaultBranch: string;
}
