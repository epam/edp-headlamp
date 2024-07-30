import { KubeObjectConfig } from '../../../../types/configs/k8s';

export const PipelineRunKubeObjectConfig: KubeObjectConfig = {
  kind: 'PipelineRun',
  name: {
    singularForm: 'pipelinerun',
    pluralForm: 'pipelineruns',
  },
  group: 'tekton.dev',
  version: 'v1',
};
