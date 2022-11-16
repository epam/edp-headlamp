import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/types/lib/k8s/cluster';
import { DeepPartial } from '../../../types/global';

export const CIPipelineProvisionersMock: DeepPartial<KubeObjectInterface> = {
    items: [
        {
            apiVersion: 'v2.edp.epam.com/v1',
            kind: 'Jenkins',
            metadata: {
                name: 'jenkins',
                namespace: 'edp-delivery-vp-dev',
            },
            status: {
                jobProvisions: [
                    {
                        name: 'default',
                        scope: 'ci',
                    },
                    {
                        name: 'default',
                        scope: 'cd',
                    },
                ],
            },
        },
    ],
};
