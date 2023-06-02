import { EDPCDPipelineKubeObjectInterface } from '../../../../k8s/EDPCDPipeline/types';

export interface CDPipelineListProps {
    CDPipelines: EDPCDPipelineKubeObjectInterface[];
    error: unknown;
}
