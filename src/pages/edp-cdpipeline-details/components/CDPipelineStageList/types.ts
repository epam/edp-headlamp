import { KubeObject } from '@kinvolk/headlamp-plugin/lib/K8s/cluster';
import { EDPCDPipelineKubeObjectInterface } from '../../../../k8s/EDPCDPipeline/types';

export interface CDPipelineStagesTableProps {
    kubeObject: KubeObject;
    kubeObjectData: EDPCDPipelineKubeObjectInterface;
}
