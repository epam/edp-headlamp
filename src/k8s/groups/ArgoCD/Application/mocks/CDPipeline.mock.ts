import { DeepPartial } from '../../../../../types/global';
import { CDPipelineKubeObjectInterface } from '../../../EDP/CDPipeline/types';

export const CDPipelineMock: DeepPartial<CDPipelineKubeObjectInterface> = {
  apiVersion: 'v2.edp.epam.com/v1',
  kind: 'CDPipeline',
  metadata: {
    name: 'test-pipeline-name',
    namespace: 'test-namespace',
  },
};
