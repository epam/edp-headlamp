export const PipelineRunKubeObjectConfig = {
  kind: 'PipelineRun',
  name: {
    singularForm: 'pipelinerun',
    pluralForm: 'pipelineruns',
  },
  group: 'tekton.dev',
  version: 'v1',
} as const;
