import { CodebaseBranchKubeObjectInterface } from '../../../../../../../../k8s/groups/EDP/CodebaseBranch/types';
import { PipelineRunKubeObjectInterface } from '../../../../../../../../k8s/groups/Tekton/PipelineRun/types';

export interface SummaryProps {
  codebaseBranchData: CodebaseBranchKubeObjectInterface;
  pipelineRuns: {
    all: PipelineRunKubeObjectInterface[];
    latestBuildPipelineRun: PipelineRunKubeObjectInterface;
  };
}
