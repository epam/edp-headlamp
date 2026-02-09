import { CodebaseKubeObjectInterface } from '../../../../../../k8s/groups/EDP/Codebase/types';
import { CodebaseBranchKubeObjectInterface } from '../../../../../../k8s/groups/EDP/CodebaseBranch/types';

export interface TableHeaderActionsProps {
  codebase: CodebaseKubeObjectInterface;
  defaultBranch: CodebaseBranchKubeObjectInterface;
}
