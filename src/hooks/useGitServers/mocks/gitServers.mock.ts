import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/types/lib/k8s/cluster';
import { DeepPartial } from '../../../types/global';

export const gitServersMock: DeepPartial<KubeObjectInterface> = {
    items: [
        {
            apiVersion: 'v2.edp.epam.com/v1',
            kind: 'GitServer',
            metadata: {
                name: 'git-server-1',
            },
        },
        {
            apiVersion: 'v2.edp.epam.com/v1',
            kind: 'GitServer',
            metadata: {
                name: 'git-server-2',
            },
        },
    ],
};
