import { EDPCDPipelineKubeObjectInterface } from '../../../k8s/EDPCDPipeline/types';
import { DeepPartial } from '../../../types/global';

export const CDPipelineMock: DeepPartial<EDPCDPipelineKubeObjectInterface> = {
    apiVersion: 'v2.edp.epam.com/v1',
    kind: 'CDPipeline',
    metadata: {
        name: 'vp-test-jenkins-pipe',
        namespace: 'edp-delivery-vp-dev',
        resourceVersion: '335232772',
    },
    spec: {
        applications: ['test-python-2', 'vp-test-jenkins'],
        applicationsToPromote: ['test-python-2', 'vp-test-jenkins'],
        deploymentType: 'container',
        inputDockerStreams: ['test-python-2-main', 'vp-test-jenkins-master'],
        name: 'vp-test-jenkins-pipe',
    },
};
