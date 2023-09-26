import { DeepPartial } from '../../../../types/global';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../EDPCDPipelineStage/types';

export const CDPipelineStageMock: DeepPartial<EDPCDPipelineStageKubeObjectInterface> = {
    apiVersion: 'v2.edp.epam.com/v1',
    kind: 'Stage',
    metadata: {
        name: 'test-pipeline-name-test-stage-name',
        namespace: 'test-namespace',
    },
    spec: {
        name: 'test-stage-name',
        clusterName: 'test-cluster-name',
        namespace: 'test-namespace-test-pipeline-name-test-stage-name',
    },
};
