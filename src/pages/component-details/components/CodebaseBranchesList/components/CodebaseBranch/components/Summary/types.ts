import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { CodebaseBranchKubeObjectInterface } from '../../../../../../../../k8s/groups/EDP/CodebaseBranch/types';
import { PipelineRunKubeObjectInterface } from '../../../../../../../../k8s/groups/Tekton/PipelineRun/types';

export interface SummaryProps {
  codebaseBranchData: CodebaseBranchKubeObjectInterface;
  pipelineRuns: {
    all: PipelineRunKubeObjectInterface[];
    latestBuildPipelineRun: PipelineRunKubeObjectInterface;
  };
  handleOpenEditor: (data: KubeObjectInterface) => void;
  menuAnchorEl: HTMLElement | null;
  handleClickMenu: (event: React.MouseEvent<HTMLElement>) => void;
  handleCloseMenu: () => void;
  createBuildPipelineRun: (data: PipelineRunKubeObjectInterface) => void;
}
