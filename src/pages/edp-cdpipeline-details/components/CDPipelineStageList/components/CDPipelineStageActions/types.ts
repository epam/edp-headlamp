import { EDPCDPipelineStageKubeObjectInterface } from '../../../../../../k8s/EDPCDPipelineStage/types';
import type { k8s } from '../../../../../../plugin.types';

export interface CDPipelineStageActionsProps {
    kubeObject: k8s.cluster.KubeObject;
    kubeObjectData: EDPCDPipelineStageKubeObjectInterface;
    cdpipelineStages: EDPCDPipelineStageKubeObjectInterface[];
    onEdit?(): void;
    onDelete?(): void;
}
