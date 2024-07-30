import { DeepPartial } from '../../../../../types/global';
import { StageKubeObjectInterface } from '../../../EDP/Stage/types';

export const CDPipelineStageMock: DeepPartial<StageKubeObjectInterface> = {
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
