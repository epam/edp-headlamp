import { EnrichedApplicationWithArgoApplication } from '../../types';

export interface ApplicationsProps {
  enrichedApplicationsWithArgoApplications: EnrichedApplicationWithArgoApplication[];
  latestDeployPipelineRunIsRunning: boolean;
}
