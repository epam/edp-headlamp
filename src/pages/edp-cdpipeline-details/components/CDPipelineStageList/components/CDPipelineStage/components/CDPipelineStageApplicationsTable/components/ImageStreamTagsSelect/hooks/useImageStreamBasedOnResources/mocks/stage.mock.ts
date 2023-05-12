import { EDPCDPipelineStageKubeObjectInterface } from '../../../../../../../../../../../../../k8s/EDPCDPipelineStage/types';
import { DeepPartial } from '../../../../../../../../../../../../../types/global';

export const stageMock: DeepPartial<EDPCDPipelineStageKubeObjectInterface> = {
    apiVersion: 'v2.edp.epam.com/v1',
    kind: 'Stage',
    metadata: {
        annotations: {
            'app.edp.epam.com/vp-test-jenkins': 'master-1.0.0-1',
        },
        creationTimestamp: '2022-10-25T19:59:26Z',
        labels: {
            'app.edp.epam.com/cdPipelineName': 'vp-test-jenkins-pipe',
        },
        name: 'vp-test-jenkins-pipe-qa',
        namespace: 'edp-delivery-vp-dev',
        ownerReferences: [
            {
                apiVersion: 'v2.edp.epam.com/v1',
                blockOwnerDeletion: true,
                controller: true,
                kind: 'CDPipeline',
                name: 'vp-test-jenkins-pipe',
                uid: 'c8ec5817-aef6-44e4-95c3-e79f20457a82',
            },
        ],
        resourceVersion: '340865830',
        uid: '728ac0c0-17b3-40da-a752-255b0f804ca2',
    },
    spec: {
        cdPipeline: 'vp-test-jenkins-pipe',
        description: 'qa descr',
        jobProvisioning: 'default',
        name: 'qa',
        order: 1,
        qualityGates: [
            {
                autotestName: null,
                branchName: null,
                qualityGateType: 'manual',
                stepName: 'step-1',
            },
        ],
        source: {
            library: {
                name: 'default',
            },
            type: 'default',
        },
        triggerType: 'Manual',
    },
    status: {
        action: 'accept_cd_stage_registration',
        available: true,
        last_time_updated: '2022-10-28T05:54:12Z',
        result: 'success',
        status: 'created',
        username: 'system',
        value: 'active',
    },
};
