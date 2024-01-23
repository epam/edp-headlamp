import { DeepPartial } from '../../../../types/global';
import { EDPCDPipelineKubeObjectInterface } from '../../../EDPCDPipeline/types';

export const CDPipelineMock: DeepPartial<EDPCDPipelineKubeObjectInterface> = {
  apiVersion: 'v2.edp.epam.com/v1',
  kind: 'CDPipeline',
  metadata: {
    name: 'test-pipeline-name',
    namespace: 'test-namespace',
  },
};
