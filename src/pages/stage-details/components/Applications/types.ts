import { ValueOf } from '../../../../types/global';
import { APPLICATIONS_TABLE_MODE } from '../../constants';
import { EnrichedApplicationWithArgoApplication } from '../../types';

export interface ApplicationsProps {
  enrichedApplicationsWithArgoApplications: EnrichedApplicationWithArgoApplication[];
  latestDeployPipelineRunIsRunning: boolean;
}

export interface ButtonsMap {
  deploy: boolean;
  uninstall: boolean;
}

export type ApplicationsTableMode = ValueOf<typeof APPLICATIONS_TABLE_MODE>;
