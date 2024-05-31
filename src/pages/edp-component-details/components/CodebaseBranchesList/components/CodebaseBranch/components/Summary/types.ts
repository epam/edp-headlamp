import { EDPCodebaseKubeObjectInterface } from '../../../../../../../../k8s/EDPCodebase/types';
import { EDPCodebaseBranchKubeObjectInterface } from '../../../../../../../../k8s/EDPCodebaseBranch/types';
import { PipelineRunKubeObjectInterface } from '../../../../../../../../k8s/PipelineRun/types';

export interface SummaryProps {
  codebaseBranchData: EDPCodebaseBranchKubeObjectInterface;
  codebaseData: EDPCodebaseKubeObjectInterface;
  pipelineRuns: {
    all: PipelineRunKubeObjectInterface[];
    latestBuildPipelineRun: PipelineRunKubeObjectInterface;
  };
  defaultBranch: string;
}
