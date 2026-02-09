import { CodebaseKubeObjectInterface } from '../../../k8s/groups/EDP/Codebase/types';
import { CodebaseBranchKubeObjectInterface } from '../../../k8s/groups/EDP/CodebaseBranch/types';
import { DialogProps } from '../../../providers/Dialog/types';
import { FormValues } from '../../../types/forms';
import { CODEBASE_BRANCH_FORM_NAMES } from './names';

export interface ManageCodebaseBranchDialogProps
  extends DialogProps<{
    codebaseBranches: CodebaseBranchKubeObjectInterface[];
    codebase: CodebaseKubeObjectInterface;
    defaultBranch: CodebaseBranchKubeObjectInterface;
    pipelines: {
      review: string;
      build: string;
    };
    codebaseBranch?: CodebaseBranchKubeObjectInterface;
  }> {}

export type ManageCodebaseBranchFormValues = FormValues<typeof CODEBASE_BRANCH_FORM_NAMES>;
