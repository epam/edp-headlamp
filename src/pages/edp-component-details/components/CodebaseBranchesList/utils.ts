import { EDPCodebaseKubeObjectInterface } from '../../../../k8s/EDPCodebase/types';
import { EDPCodebaseBranchKubeObjectInterface } from '../../../../k8s/EDPCodebaseBranch/types';

export const isDefaultBranch = (
  codebase: EDPCodebaseKubeObjectInterface,
  codebaseBranch: EDPCodebaseBranchKubeObjectInterface
) => codebase.spec.defaultBranch === codebaseBranch.spec.branchName;
