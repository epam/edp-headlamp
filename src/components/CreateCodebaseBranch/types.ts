import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { EDPCodebaseBranchKubeObjectInterface } from '../../k8s/EDPCodebaseBranch/types';

export interface CreateCodebaseBranchProps {
    codebaseData: EDPCodebaseKubeObjectInterface;
    open: boolean;
    onClose(): void;
    setOpen(boolean): void;
    handleApply({
        codebaseBranchData,
        defaultCodebaseBranchData,
    }: {
        codebaseBranchData: EDPCodebaseBranchKubeObjectInterface;
        defaultCodebaseBranchData?: EDPCodebaseBranchKubeObjectInterface;
    }): void;
    isApplying: boolean;
}
