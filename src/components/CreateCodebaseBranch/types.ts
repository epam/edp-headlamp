import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { DeepPartial } from '../../types/global';

export interface CreateCodebaseBranchProps {
    codebaseData: DeepPartial<EDPCodebaseKubeObjectInterface>;
    open: boolean;
    onClose(): void;
    setOpen(boolean): void;
}
