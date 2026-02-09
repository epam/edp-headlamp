import { KubeObjectClass } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { ApprovalTaskKubeObject } from '../../../../k8s/groups/EDP/ApprovalTask';
import { ApprovalTaskKubeObjectConfig } from '../../../../k8s/groups/EDP/ApprovalTask/config';
import { PipelineRunKubeObject } from '../../../../k8s/groups/Tekton/PipelineRun';
import { PipelineRunKubeObjectConfig } from '../../../../k8s/groups/Tekton/PipelineRun/config';

export const permissionChecks = {
  PIPELINE_RUN: 'pipelineRun',
} as const;

export const permissionsToCheckConfig = {
  create: [
    {
      instance: PipelineRunKubeObject as unknown as KubeObjectClass,
      config: PipelineRunKubeObjectConfig,
    },
  ],
  update: [
    {
      instance: PipelineRunKubeObject as unknown as KubeObjectClass,
      config: PipelineRunKubeObjectConfig,
    },
    {
      instance: ApprovalTaskKubeObject as unknown as KubeObjectClass,
      config: ApprovalTaskKubeObjectConfig,
    },
  ],
  delete: [
    {
      instance: PipelineRunKubeObject as unknown as KubeObjectClass,
      config: PipelineRunKubeObjectConfig,
    },
  ],
};
