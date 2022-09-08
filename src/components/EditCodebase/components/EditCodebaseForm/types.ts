import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/types/lib/k8s/cluster';
import { EDPCodebaseKubeObjectInterface } from '../../../../k8s/EDPCodebase/types';
import { DeepPartial } from '../../../../types/global';

export interface EditCodebaseFormProps {
    handleApply(data: KubeObjectInterface): void;
    setDialogOpen(boolean): void;
    codebaseData: DeepPartial<EDPCodebaseKubeObjectInterface>;
}
