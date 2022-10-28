import { EDPCDPipelineKubeObjectInterface } from '../../../k8s/EDPCDPipeline/types';
import { DeepPartial } from '../../../types/global';

export const codebasesMock: DeepPartial<EDPCDPipelineKubeObjectInterface> = {
    items: [
        {
            apiVersion: 'v2.edp.epam.com/v1',
            kind: 'Codebase',
            metadata: {
                name: 'vp-test-python',
                namespace: 'edp-delivery-vp-dev',
            },
        },
    ],
};
