import { EDPCDPipelineStageKubeObjectInterface } from '../../../../../../../../k8s/EDPCDPipelineStage/types';

export interface ClusterCDPipelineConflictErrorProps {
    conflictedStage: EDPCDPipelineStageKubeObjectInterface;
    clusterName: string;
}
