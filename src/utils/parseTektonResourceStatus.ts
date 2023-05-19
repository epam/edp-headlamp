import { CUSTOM_RESOURCE_STATUSES, TEKTON_RESOURCE_STATUSES } from '../constants/statuses';
import { KubeObjectInterface } from '../plugin.types';

export const parseTektonResourceStatus = (resource: KubeObjectInterface): string => {
    if (!resource?.status?.conditions?.length) {
        return CUSTOM_RESOURCE_STATUSES.UNKNOWN;
    }

    const reasonValue = resource.status.conditions[0].reason.toLowerCase();
    const statusValue = resource.status.conditions[0].status.toLowerCase();

    if (reasonValue === TEKTON_RESOURCE_STATUSES.RUNNING) {
        return reasonValue;
    }

    if (reasonValue === TEKTON_RESOURCE_STATUSES.PENDING) {
        return reasonValue;
    }

    if (statusValue === 'true') {
        return TEKTON_RESOURCE_STATUSES.SUCCEEDED;
    }

    return CUSTOM_RESOURCE_STATUSES.UNKNOWN;
};
