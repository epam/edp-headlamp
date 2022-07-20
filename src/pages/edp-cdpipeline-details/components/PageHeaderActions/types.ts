import { EDPCDPipelineKubeObjectInterface } from '../../../../k8s/EDPCDPipeline/types';
import { k8s } from '../../../../plugin.types';

export interface PageHeaderActionsProps {
    kubeObject: k8s.cluster.KubeObject;
    kubeObjectData: EDPCDPipelineKubeObjectInterface;
}
