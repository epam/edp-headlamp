import { StageKubeObjectInterface } from '../../../../../../../../k8s/groups/EDP/Stage/types';

export interface ClusterCDPipelineConflictErrorProps {
  conflictedStage: StageKubeObjectInterface;
  clusterName: string;
}
