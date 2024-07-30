export const permissionChecks = {
  PIPELINE_RUN: 'pipelineRun',
  STAGE: 'stage',
  ARGO_APPLICATION: 'argoApplication',
} as const;

export const APPLICATIONS_TABLE_MODE = {
  PREVIEW: 'preview',
  CONFIGURATION: 'configuration',
} as const;

export const ALL_VALUES_OVERRIDE_KEY = 'values-override';
export const VALUES_OVERRIDE_POSTFIX = '::values-override';
export const IMAGE_TAG_POSTFIX = '::image-tag';
