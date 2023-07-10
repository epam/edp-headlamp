import { EDPCDPipelineStageKubeObjectInterface } from '../../../../../k8s/EDPCDPipelineStage/types';
import { DeepPartial } from '../../../../../types/global';

export const stageSitMock: DeepPartial<EDPCDPipelineStageKubeObjectInterface> = {
    kind: 'Stage',
    apiVersion: 'v2.edp.epam.com/v1',
    metadata: {
        name: 'test-pipe-sit',
        namespace: 'edp-delivery-vp-delivery-dev',
    },
    spec: {
        cdPipeline: 'test-pipe',
        description: 'sit-description',
        jobProvisioning: 'default',
        name: 'sit',
        order: 0,
        qualityGates: [
            {
                autotestName: 'autotests',
                branchName: 'master',
                qualityGateType: 'autotests',
                stepName: 'sit',
            },
        ],
        source: {
            library: {},
            type: 'default',
        },
        triggerType: 'Manual',
    },
};
