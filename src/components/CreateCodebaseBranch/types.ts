import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { EDPCodebaseBranchKubeObjectInterface } from '../../k8s/EDPCodebaseBranch/types';
import { DeepPartial } from '../../types/global';

export interface CreateCodebaseBranchProps {
    codebaseData: DeepPartial<EDPCodebaseKubeObjectInterface>;
    open: boolean;
    onClose(): void;
    setOpen(boolean): void;
    handleApply(newCodebaseBranchData: EDPCodebaseBranchKubeObjectInterface): void;
    isApplying: boolean;
}
