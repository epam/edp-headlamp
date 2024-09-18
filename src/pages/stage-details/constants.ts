import { ApplicationKubeObject } from '../../k8s/groups/ArgoCD/Application';
import { ApplicationKubeObjectConfig } from '../../k8s/groups/ArgoCD/Application/config';
import { StageKubeObject } from '../../k8s/groups/EDP/Stage';
import { StageKubeObjectConfig } from '../../k8s/groups/EDP/Stage/config';
import { PipelineRunKubeObject } from '../../k8s/groups/Tekton/PipelineRun';
import { PipelineRunKubeObjectConfig } from '../../k8s/groups/Tekton/PipelineRun/config';

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

export const permissionsToCheckConfig = {
  create: [{ instance: PipelineRunKubeObject, config: PipelineRunKubeObjectConfig }],
  update: [
    { instance: PipelineRunKubeObject, config: PipelineRunKubeObjectConfig },
    { instance: StageKubeObject, config: StageKubeObjectConfig },
  ],
  delete: [
    { instance: PipelineRunKubeObject, config: PipelineRunKubeObjectConfig },
    { instance: StageKubeObject, config: StageKubeObjectConfig },
    { instance: ApplicationKubeObject, config: ApplicationKubeObjectConfig },
  ],
};
