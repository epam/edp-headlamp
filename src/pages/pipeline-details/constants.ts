import { ApprovalTaskKubeObject } from '../../k8s/groups/EDP/ApprovalTask';
import { ApprovalTaskKubeObjectConfig } from '../../k8s/groups/EDP/ApprovalTask/config';
import { PipelineRunKubeObject } from '../../k8s/groups/Tekton/PipelineRun';
import { PipelineRunKubeObjectConfig } from '../../k8s/groups/Tekton/PipelineRun/config';

export const permissionChecks = {
  PIPELINE_RUN: 'pipelineRun',
} as const;

export const permissionsToCheckConfig = {
  create: [{ instance: PipelineRunKubeObject, config: PipelineRunKubeObjectConfig }],
  update: [
    { instance: PipelineRunKubeObject, config: PipelineRunKubeObjectConfig },
    { instance: ApprovalTaskKubeObject, config: ApprovalTaskKubeObjectConfig },
  ],
  delete: [{ instance: PipelineRunKubeObject, config: PipelineRunKubeObjectConfig }],
};
