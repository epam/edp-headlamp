import { EDPCDPipelineStageKubeObjectInterface } from '../../../../../k8s/EDPCDPipelineStage/types';
import { DeepPartial } from '../../../../../types/global';

export const stageQAMock: DeepPartial<EDPCDPipelineStageKubeObjectInterface> = {
    kind: 'Stage',
    apiVersion: 'v2.edp.epam.com/v1',
    metadata: {
        name: 'test-pipe-qa',
        namespace: 'edp-delivery-vp-delivery-dev',
    },
    spec: {
        cdPipeline: 'test-pipe',
        description: 'qa-description',
        jobProvisioning: 'default',
        name: 'qa',
        order: 1,
        qualityGates: [
            {
                autotestName: 'autotests',
                branchName: 'master',
                qualityGateType: 'autotests',
                stepName: 'qa',
            },
        ],
        source: {
            library: {},
            type: 'default',
        },
        triggerType: 'Manual',
    },
};
