import { KubeObjectClass } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { CDPipelineKubeObject } from '../../k8s/groups/EDP/CDPipeline';
import { CDPipelineKubeObjectConfig } from '../../k8s/groups/EDP/CDPipeline/config';

export const widgetPermissionsToCheck = {
  create: [],
  update: [
    {
      instance: CDPipelineKubeObject as unknown as KubeObjectClass,
      config: CDPipelineKubeObjectConfig,
    },
  ],
  delete: [
    {
      instance: CDPipelineKubeObject as unknown as KubeObjectClass,
      config: CDPipelineKubeObjectConfig,
    },
  ],
};
