import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { EDPCodebaseBranchKubeObjectInterface } from '../../k8s/EDPCodebaseBranch/types';
import { FormValues } from '../../types/forms';
import { CODEBASE_BRANCH_FORM_NAMES } from './names';

export interface CreateCodebaseBranchDialogForwardedProps {
  codebase: EDPCodebaseKubeObjectInterface;
  defaultBranch: EDPCodebaseBranchKubeObjectInterface;
}

export type CreateCodebaseBranchFormValues = FormValues<typeof CODEBASE_BRANCH_FORM_NAMES>;
