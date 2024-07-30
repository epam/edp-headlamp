import { CodebaseKubeObjectInterface } from '../../k8s/groups/EDP/Codebase/types';
import { CodebaseBranchKubeObjectInterface } from '../../k8s/groups/EDP/CodebaseBranch/types';
import { FormValues } from '../../types/forms';
import { CODEBASE_BRANCH_FORM_NAMES } from './names';

export interface CreateCodebaseBranchDialogForwardedProps {
  codebase: CodebaseKubeObjectInterface;
  defaultBranch: CodebaseBranchKubeObjectInterface;
}

export type CreateCodebaseBranchFormValues = FormValues<typeof CODEBASE_BRANCH_FORM_NAMES>;
