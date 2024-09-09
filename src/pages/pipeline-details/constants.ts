import { PipelineRunKubeObject } from '../../k8s/groups/Tekton/PipelineRun';
import { PipelineRunKubeObjectConfig } from '../../k8s/groups/Tekton/PipelineRun/config';

export const permissionChecks = {
  PIPELINE_RUN: 'pipelineRun',
} as const;

export const permissionsToCheckConfig = {
  create: [{ instance: PipelineRunKubeObject, config: PipelineRunKubeObjectConfig }],
  update: [{ instance: PipelineRunKubeObject, config: PipelineRunKubeObjectConfig }],
  delete: [{ instance: PipelineRunKubeObject, config: PipelineRunKubeObjectConfig }],
};
