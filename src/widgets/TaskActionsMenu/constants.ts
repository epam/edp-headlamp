import { KubeObjectClass } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { TaskKubeObject } from '../../k8s/groups/Tekton/Task';
import { TaskKubeObjectConfig } from '../../k8s/groups/Tekton/Task/config';

export const widgetPermissionsToCheck = {
  create: [],
  update: [
    {
      instance: TaskKubeObject as unknown as KubeObjectClass,
      config: TaskKubeObjectConfig,
    },
  ],
  delete: [],
};
