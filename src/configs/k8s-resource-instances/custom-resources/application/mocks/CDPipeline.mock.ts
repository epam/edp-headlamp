import { EDPCDPipelineKubeObjectInterface } from '../../../../../k8s/EDPCDPipeline/types';
import { DeepPartial } from '../../../../../types/global';

export const CDPipelineMock: DeepPartial<EDPCDPipelineKubeObjectInterface> = {
    apiVersion: 'v2.edp.epam.com/v1',
    kind: 'CDPipeline',
    metadata: {
        name: 'test-pipeline-name',
        namespace: 'test-namespace',
    },
};
