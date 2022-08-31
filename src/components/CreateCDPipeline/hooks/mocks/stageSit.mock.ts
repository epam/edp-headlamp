import { DeepPartial } from '../../../../types/global';
import { EDPKubeObjectInterface } from '../../../../types/k8s';

export const stageSitMock: DeepPartial<EDPKubeObjectInterface> = {
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
