import { EDPCDPipelineKubeObjectInterface } from '../../../../k8s/EDPCDPipeline/types';
import { k8s } from '../../../../plugin.types';

export interface CDPipelineStagesListProps {
    kubeObject: k8s.cluster.KubeObject;
    CDPipelineData: EDPCDPipelineKubeObjectInterface;
}
