import { KubeObjectClass } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { StageKubeObject } from '../../k8s/groups/EDP/Stage';
import { StageKubeObjectConfig } from '../../k8s/groups/EDP/Stage/config';

export const widgetPermissionsToCheck = {
  create: [],
  update: [
    { instance: StageKubeObject as unknown as KubeObjectClass, config: StageKubeObjectConfig },
  ],
  delete: [
    { instance: StageKubeObject as unknown as KubeObjectClass, config: StageKubeObjectConfig },
  ],
};
