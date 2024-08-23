import { CodebaseKubeObjectInterface } from '../../../../../../../../k8s/groups/EDP/Codebase/types';
import { CodebaseBranchKubeObjectInterface } from '../../../../../../../../k8s/groups/EDP/CodebaseBranch/types';

export interface ActionsProps {
  codebaseBranchData: CodebaseBranchKubeObjectInterface;
  codebaseData: CodebaseKubeObjectInterface;
  defaultBranch: CodebaseBranchKubeObjectInterface;
  pipelines: {
    review: string;
    build: string;
  };
}
