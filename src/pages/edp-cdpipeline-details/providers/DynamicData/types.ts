import { EDPCDPipelineKubeObjectInterface } from '../../../../k8s/EDPCDPipeline/types';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../k8s/EDPCDPipelineStage/types';
import { EnrichedApplicationWithItsImageStreams } from '../../../../k8s/EDPCodebase/hooks/useEnrichedApplicationsWithImageStreamsQuery';

export interface DynamicDataContextProviderValue {
    CDPipeline: EDPCDPipelineKubeObjectInterface;
    stages: EDPCDPipelineStageKubeObjectInterface[];
    enrichedApplications: EnrichedApplicationWithItsImageStreams[];
}
