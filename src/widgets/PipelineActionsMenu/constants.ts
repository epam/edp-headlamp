import { KubeObjectClass } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { PipelineKubeObject } from '../../k8s/groups/Tekton/Pipeline';
import { PipelineKubeObjectConfig } from '../../k8s/groups/Tekton/Pipeline/config';
import { PipelineRunKubeObject } from '../../k8s/groups/Tekton/PipelineRun';
import { PipelineRunKubeObjectConfig } from '../../k8s/groups/Tekton/PipelineRun/config';

export const widgetPermissionsToCheck = {
  create: [
    {
      instance: PipelineRunKubeObject as unknown as KubeObjectClass,
      config: PipelineRunKubeObjectConfig,
    },
  ],
  update: [
    {
      instance: PipelineKubeObject as unknown as KubeObjectClass,
      config: PipelineKubeObjectConfig,
    },
  ],
  delete: [],
};
