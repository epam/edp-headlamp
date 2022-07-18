import { KubeObject } from '@kinvolk/headlamp-plugin/lib/K8s/cluster';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../../../k8s/EDPCDPipelineStage/types';

export interface CDPipelineStageActionsProps {
    kubeObject: KubeObject;
    kubeObjectData: EDPCDPipelineStageKubeObjectInterface;
    cdpipelineStages: EDPCDPipelineStageKubeObjectInterface[];
}
