import {
    ARGO_APPLICATION_HEALTH_STATUSES,
    ARGO_APPLICATION_SYNC_STATUSES,
} from '../../../../../constants/statuses';
import { React } from '../../../../../plugin.globals';
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
                    ARGO_APPLICATION_HEALTH_STATUSES.HEALTHY;
                const syncIsOk =
                    argoApplication.status.sync.status.toLowerCase() ===
                    ARGO_APPLICATION_SYNC_STATUSES.SYNCED;

                return healthIsOk && syncIsOk;
            }),
        [enrichedApplicationsWithArgoApplications]
    );
};
