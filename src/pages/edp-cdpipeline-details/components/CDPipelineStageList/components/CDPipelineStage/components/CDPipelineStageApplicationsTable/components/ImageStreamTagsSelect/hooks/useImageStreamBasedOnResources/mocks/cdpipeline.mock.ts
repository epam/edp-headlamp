import { EDPCDPipelineKubeObjectInterface } from '../../../../../../../../../../../../../k8s/EDPCDPipeline/types';
import { KubeObjectInterface } from '../../../../../../../../../../../../../plugin.types';
import { DeepPartial } from '../../../../../../../../../../../../../types/global';

export const cdpipelineMock: DeepPartial<EDPCDPipelineKubeObjectInterface> = {
    apiVersion: 'v2.edp.epam.com/v1',
    kind: 'CDPipeline',
    metadata: {
        creationTimestamp: '2022-10-25T19:59:26Z',
        finalizers: ['foregroundDeletion'],
        generation: 2,
        name: 'vp-test-jenkins-pipe',
        namespace: 'edp-delivery-vp-dev',
        resourceVersion: '340855859',
        uid: 'c8ec5817-aef6-44e4-95c3-e79f20457a82',
    },
    spec: {
        applications: ['test-python-2', 'vp-test-jenkins'],
        applicationsToPromote: ['test-python-2', 'vp-test-jenkins'],
        deploymentType: 'container',
        inputDockerStreams: ['test-python-2-main', 'vp-test-jenkins-master'],
        name: 'vp-test-jenkins-pipe',
    },
    status: {
        action: 'setup_initial_structure',
        available: true,
        last_time_updated: '2022-10-28T05:52:46Z',
        result: 'success',
        status: 'created',
        username: 'system',
        value: 'active',
    },
} as KubeObjectInterface;
