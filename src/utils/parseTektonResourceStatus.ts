import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { CUSTOM_RESOURCE_STATUSES, TEKTON_RESOURCE_STATUSES } from '../constants/statuses';

export const parseTektonResourceStatus = (resource: KubeObjectInterface): string => {
    if (!resource?.status?.conditions?.length) {
        return CUSTOM_RESOURCE_STATUSES.UNKNOWN;
    }

    const reasonValue = resource.status.conditions[0].reason.toLowerCase();
    const statusValue = resource.status.conditions[0].status.toLowerCase();

    if (statusValue === 'true') {
        return TEKTON_RESOURCE_STATUSES.SUCCEEDED;
    }

    return reasonValue;
};
