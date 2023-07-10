import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { DeepPartial } from '../../types/global';

export interface EditCodebaseProps {
    open: boolean;
    onClose(): void;
    setOpen(boolean): void;
    codebaseData: DeepPartial<EDPCodebaseKubeObjectInterface>;
}
