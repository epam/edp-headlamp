import { ApplicationKubeObjectInterface } from '../../../../../../../../k8s/Application/types';
import { EnrichedApplicationWithImageStreams } from '../../../../../../../../k8s/EDPCodebase/hooks/useEnrichedApplicationsWithImageStreamsQuery';

export interface PipelineRunTriggerProps {
    namespace: string;
    runActionIsEnabled: boolean;
    enrichedApplicationsWithArgoApplications: {
        enrichedApplication: EnrichedApplicationWithImageStreams;
        argoApplication: ApplicationKubeObjectInterface;
    }[];
}
