import React from 'react';
import {
  ARGO_APPLICATION_HEALTH_STATUS,
  ARGO_APPLICATION_SYNC_STATUS,
} from '../../../constants/statuses';
import { EnrichedApplicationWithArgoApplication } from '../types';

export const useEveryArgoAppIsHealthyAndInSync = (
  enrichedApplicationsWithArgoApplications: EnrichedApplicationWithArgoApplication[]
) => {
  return React.useMemo(
    () =>
      enrichedApplicationsWithArgoApplications &&
      enrichedApplicationsWithArgoApplications.length &&
      enrichedApplicationsWithArgoApplications.every(({ argoApplication }) => {
        if (!argoApplication?.status?.health?.status) {
          return false;
        }

        if (!argoApplication?.status?.sync?.status) {
          return false;
        }

        const healthIsOk =
          argoApplication.status.health.status.toLowerCase() ===
          ARGO_APPLICATION_HEALTH_STATUS.HEALTHY;
        const syncIsOk =
          argoApplication.status.sync.status.toLowerCase() === ARGO_APPLICATION_SYNC_STATUS.SYNCED;

        return healthIsOk && syncIsOk;
      }),
    [enrichedApplicationsWithArgoApplications]
  );
};
