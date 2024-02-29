import { EnrichedApplicationWithArgoApplication } from '../../types';

export interface ApplicationsProps {
  enrichedApplicationsWithArgoApplications: EnrichedApplicationWithArgoApplication[];
  latestDeployPipelineRunIsRunning: boolean;
}

export interface ButtonsMap {
  deploy: boolean;
  uninstall: boolean;
}
