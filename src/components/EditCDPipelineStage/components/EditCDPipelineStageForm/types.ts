import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/types/lib/k8s/cluster';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../k8s/EDPCDPipelineStage/types';
import { DeepPartial } from '../../../../types/global';

export interface EditCodebaseFormProps {
    handleApply(data: KubeObjectInterface): void;
    setDialogOpen(boolean): void;
    CDPipelineStageData: DeepPartial<EDPCDPipelineStageKubeObjectInterface>;
}
