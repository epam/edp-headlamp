import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/types/lib/k8s/cluster';
import { DeepPartial } from '../../../types/global';

export const jenkinsMock: DeepPartial<KubeObjectInterface> = {
    items: [
        {
            apiVersion: 'v2.edp.epam.com/v1',
            kind: 'Jenkins',
            status: { slaves: [{ name: 'jenkins-agent-1' }, { name: 'jenkins-agent-2' }] },
        },
    ],
};
