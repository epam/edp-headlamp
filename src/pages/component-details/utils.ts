import { CodebaseKubeObjectInterface } from '../../k8s/groups/EDP/Codebase/types';
import { CodebaseBranchKubeObjectInterface } from '../../k8s/groups/EDP/CodebaseBranch/types';

export const isDefaultBranch = (
  codebase: CodebaseKubeObjectInterface,
  codebaseBranch: CodebaseBranchKubeObjectInterface
) => codebase.spec.defaultBranch === codebaseBranch.spec.branchName;
