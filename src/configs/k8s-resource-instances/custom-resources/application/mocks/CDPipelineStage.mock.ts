import { EDPCDPipelineStageKubeObjectInterface } from '../../../../../k8s/EDPCDPipelineStage/types';
import { DeepPartial } from '../../../../../types/global';

export const CDPipelineStageMock: DeepPartial<EDPCDPipelineStageKubeObjectInterface> = {
    apiVersion: 'v2.edp.epam.com/v1',
    kind: 'Stage',
    metadata: {
        name: 'test-pipeline-name-test-stage-name',
        namespace: 'test-namespace',
    },
    spec: {
        name: 'test-stage-name',
    },
};
