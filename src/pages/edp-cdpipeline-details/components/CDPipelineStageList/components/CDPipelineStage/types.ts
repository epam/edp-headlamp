import { ApplicationKubeObjectInterface } from '../../../../../../k8s/Application/types';
import { EDPCDPipelineStageSpecQualityGatesInterface } from '../../../../../../k8s/EDPCDPipelineStage/types';
import { EnrichedApplicationWithItsImageStreams } from '../../../../../../k8s/EDPCodebase/hooks/useEnrichedApplicationsWithImageStreamsQuery';
import { PipelineRunKubeObjectInterface } from '../../../../../../k8s/PipelineRun/types';

export interface EnrichedApplicationWithArgoApplication {
    enrichedApplicationWithItsImageStreams: EnrichedApplicationWithItsImageStreams;
    argoApplication: ApplicationKubeObjectInterface;
}

export interface EnrichedQualityGateWithAutotestPipelineRun {
    qualityGate: EDPCDPipelineStageSpecQualityGatesInterface;
    autotestPipelineRun: PipelineRunKubeObjectInterface;
}
