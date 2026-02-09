import { KubeObjectClass } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { QuickLinkKubeObject } from '../../k8s/groups/EDP/QuickLink';
import { QuickLinkKubeObjectConfig } from '../../k8s/groups/EDP/QuickLink/config';

export const permissionsToCheckConfig = {
  create: [
    {
      instance: QuickLinkKubeObject as unknown as KubeObjectClass,
      config: QuickLinkKubeObjectConfig,
    },
  ],
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
