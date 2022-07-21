import { EDPCDPipelineKubeObjectInterface } from '../../../../k8s/EDPCDPipeline/types';
import { k8s } from '../../../../plugin.types';

export interface CDPipelineStagesTableProps {
    kubeObject: k8s.cluster.KubeObject;
    kubeObjectData: EDPCDPipelineKubeObjectInterface;
}
