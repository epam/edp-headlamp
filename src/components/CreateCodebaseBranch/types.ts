import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { CreationFormFieldInterface, FormData, FormNameKeys } from '../../types/forms';
import { CODEBASE_BRANCH_FORM_NAMES } from './names';

export interface CreateCodebaseBranchProps {
    codebaseData: EDPCodebaseKubeObjectInterface;
    open: boolean;
    handleCloseDialog: () => void;
    handleOpenDialog: () => void;
}

export type CreateCodebaseBranchFormNames = FormData<typeof CODEBASE_BRANCH_FORM_NAMES>;
export type CreateCodebaseBranchFormKeys = FormNameKeys<typeof CODEBASE_BRANCH_FORM_NAMES>;
export type CodebaseBranchCreationFormFieldInterface = CreationFormFieldInterface<
    typeof CODEBASE_BRANCH_FORM_NAMES
>;
