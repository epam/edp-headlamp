export const PipelineKubeObjectConfig = {
  kind: 'PipelineRun',
  name: {
    singularForm: 'pipeline',
    pluralForm: 'pipelines',
  },
  group: 'tekton.dev',
  version: 'v1',
} as const;
