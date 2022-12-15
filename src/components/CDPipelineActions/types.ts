import { EDPCDPipelineKubeObjectInterface } from '../../k8s/EDPCDPipeline/types';

export interface CDPipelineActionsProps {
    kubeObjectData: EDPCDPipelineKubeObjectInterface;
    isDetailsPage?: boolean;
}
