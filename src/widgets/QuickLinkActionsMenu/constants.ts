import { KubeObjectClass } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { QuickLinkKubeObject } from '../../k8s/groups/EDP/QuickLink';
import { QuickLinkKubeObjectConfig } from '../../k8s/groups/EDP/QuickLink/config';

export const widgetPermissionsToCheck = {
  create: [],
  update: [
    {
      instance: QuickLinkKubeObject as unknown as KubeObjectClass,
      config: QuickLinkKubeObjectConfig,
    },
  ],
  delete: [
    {
      instance: QuickLinkKubeObject as unknown as KubeObjectClass,
      config: QuickLinkKubeObjectConfig,
    },
  ],
};
