import { KubeObjectClass } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { SecretKubeObject } from '../../k8s/groups/default/Secret';
import { SecretKubeObjectConfig } from '../../k8s/groups/default/Secret/config';
import { CodemieKubeObject } from '../../k8s/groups/EDP/Codemie';
import { CodemieKubeObjectConfig } from '../../k8s/groups/EDP/Codemie/config';
import { QuickLinkKubeObject } from '../../k8s/groups/EDP/QuickLink';
import { QuickLinkKubeObjectConfig } from '../../k8s/groups/EDP/QuickLink/config';

export const FORM_NAMES = {
  QUICK_LINK: 'quickLink',
  CODEMIE: 'codemie',
  CODEMIE_SECRET: 'codemieSecret',
} as const;

export const widgetPermissionsToCheck = {
  create: [
    { instance: SecretKubeObject as unknown as KubeObjectClass, config: SecretKubeObjectConfig },
    { instance: CodemieKubeObject as unknown as KubeObjectClass, config: CodemieKubeObjectConfig },
  ],
  update: [
    { instance: SecretKubeObject as unknown as KubeObjectClass, config: SecretKubeObjectConfig },
    { instance: CodemieKubeObject as unknown as KubeObjectClass, config: CodemieKubeObjectConfig },
    {
      instance: QuickLinkKubeObject as unknown as KubeObjectClass,
      config: QuickLinkKubeObjectConfig,
    },
  ],
  delete: [
    { instance: SecretKubeObject as unknown as KubeObjectClass, config: SecretKubeObjectConfig },
  ],
};
