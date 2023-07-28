import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { FormValues } from '../../types/forms';
import { CODEBASE_BRANCH_FORM_NAMES } from './names';

export interface CreateCodebaseBranchDialogForwardedProps {
    codebase: EDPCodebaseKubeObjectInterface;
}

export type CreateCodebaseBranchFormValues = FormValues<typeof CODEBASE_BRANCH_FORM_NAMES>;
