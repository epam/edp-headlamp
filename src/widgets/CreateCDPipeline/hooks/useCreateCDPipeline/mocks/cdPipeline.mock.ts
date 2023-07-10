import { EDPCDPipelineKubeObjectInterface } from '../../../../../k8s/EDPCDPipeline/types';
import { DeepPartial } from '../../../../../types/global';

export const cdPipelineMock: DeepPartial<EDPCDPipelineKubeObjectInterface> = {
    apiVersion: 'v2.edp.epam.com/v1',
    kind: 'CDPipeline',
    metadata: {
        name: 'test-pipe',
        namespace: 'edp-delivery-vp-delivery-dev',
    },
    spec: {
        name: 'test-pipe',
        deploymentType: 'container',
        applications: ['test-app-2', 'test-application'],
        inputDockerStreams: ['test-app-2-master', 'test-application-develop'],
        applicationsToPromote: ['test-app-2', 'test-application'],
    },
};
