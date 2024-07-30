import { KubeObjectConfig } from '../../../../types/configs/k8s';

export const CDPipelineKubeObjectConfig: KubeObjectConfig = {
  kind: 'CDPipeline',
  name: {
    singularForm: 'cdpipeline',
    pluralForm: 'cdpipelines',
  },
  group: 'v2.edp.epam.com',
  version: 'v1',
};
