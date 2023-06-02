import { EnrichedApplicationWithItsImageStreams } from '../../../../k8s/EDPCodebase/hooks/useEnrichedApplicationsWithImageStreamsQuery';

export interface EnrichedApplicationsContextProviderValue {
    enrichedApplications: EnrichedApplicationWithItsImageStreams[];
}
