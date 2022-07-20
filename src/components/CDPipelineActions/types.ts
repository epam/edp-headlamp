import { EDPCDPipelineKubeObjectInterface } from '../../k8s/EDPCDPipeline/types';
import { KubeObject } from '../../plugin.types';

export interface CDPipelineActionsProps {
    kubeObject: KubeObject;
    kubeObjectData: EDPCDPipelineKubeObjectInterface;
}
