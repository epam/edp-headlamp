import { KubeObjectConfig } from '../../types/configs/k8s';

export const PipelineKubeObjectConfig: KubeObjectConfig = {
  kind: 'PipelineRun',
  name: {
    singularForm: 'pipeline',
    pluralForm: 'pipelines',
  },
  group: 'tekton.dev',
  version: 'v1',
};
