import { EnrichedApplicationWithArgoApplication } from '../../types';

export interface PipelineRunTriggerProps {
    namespace: string;
    runActionIsEnabled: boolean;
    enrichedApplicationsWithArgoApplications: EnrichedApplicationWithArgoApplication[];
}
