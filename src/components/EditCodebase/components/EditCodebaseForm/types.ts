import { EDPCodebaseKubeObjectInterface } from '../../../../k8s/EDPCodebase/types';
import { DeepPartial } from '../../../../types/global';

export interface EditCodebaseFormProps {
    handleApply({ codebaseData }: { codebaseData: EDPCodebaseKubeObjectInterface }): void;
    setDialogOpen(boolean): void;
    codebaseData: DeepPartial<EDPCodebaseKubeObjectInterface>;
}
