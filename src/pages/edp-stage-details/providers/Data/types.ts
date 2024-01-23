import { EDPCDPipelineKubeObjectInterface } from '../../../../k8s/EDPCDPipeline/types';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../k8s/EDPCDPipelineStage/types';
import { EnrichedApplicationWithItsImageStreams } from '../../../../k8s/EDPCodebase/hooks/useEnrichedApplicationsWithImageStreamsQuery';
import { EDPCodebaseKubeObjectInterface } from '../../../../k8s/EDPCodebase/types';
import { KubeObjectListInterface } from '../../../../types/k8s';

export interface DataContextProviderValue {
  CDPipeline: EDPCDPipelineKubeObjectInterface;
  stages: KubeObjectListInterface<EDPCDPipelineStageKubeObjectInterface>;
  enrichedApplications: EnrichedApplicationWithItsImageStreams[];
  gitOpsCodebase: EDPCodebaseKubeObjectInterface;
}
