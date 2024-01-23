import { EnrichedApplicationWithArgoApplication } from '../../types';

export interface ApplicationsProps {
  enrichedApplicationsWithArgoApplications: EnrichedApplicationWithArgoApplication[];
  qualityGatePipelineIsRunning: boolean;
}
