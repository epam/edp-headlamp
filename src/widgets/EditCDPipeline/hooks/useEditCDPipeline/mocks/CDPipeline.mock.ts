import { EDPCDPipelineKubeObjectInterface } from '../../../../../k8s/EDPCDPipeline/types';
import { DeepPartial } from '../../../../../types/global';

export const CDPipelineMock: DeepPartial<EDPCDPipelineKubeObjectInterface> = {
    apiVersion: 'v2.edp.epam.com/v1',
    kind: 'CDPipeline',
    metadata: {
        name: 'test',
        namespace: 'edp-delivery-vp-delivery-dev',
    },
    spec: {
        applications: ['test-app-2', 'test-app-7', 'test-application'],
        applicationsToPromote: ['test-app-2', 'test-app-7', 'test-application'],
        deploymentType: 'container',
        inputDockerStreams: [
            'test-app-2-master',
            'test-app-7-master',
            'test-application-test-branch',
        ],
        name: 'test',
    },
};
