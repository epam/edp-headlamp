import { CodebaseKubeObjectInterface } from '../../../../../../k8s/groups/EDP/Codebase/types';

export interface CodebaseBranchActionsProps {
  codebaseData: CodebaseKubeObjectInterface;
  defaultBranch: string;
}
