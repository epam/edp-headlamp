import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/types/lib/k8s/cluster';
import { DeepPartial } from '../../../types/global';

export const pipelinesMock: DeepPartial<KubeObjectInterface> = {
    items: [
        {
            apiVersion: 'tekton.dev/v1beta1',
            kind: 'Pipeline',
            metadata: {
                labels: {
                    'app.edp.epam.com/pipelinetype': 'deploy',
                },
                name: 'cdpipeline',
                namespace: 'edp-delivery-tekton-dev',
            },
        },
    ],
};
