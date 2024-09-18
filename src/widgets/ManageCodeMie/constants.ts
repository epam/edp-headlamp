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
    { instance: SecretKubeObject, config: SecretKubeObjectConfig },
    { instance: CodemieKubeObject, config: CodemieKubeObjectConfig },
  ],
  update: [
    { instance: SecretKubeObject, config: SecretKubeObjectConfig },
    { instance: CodemieKubeObject, config: CodemieKubeObjectConfig },
    { instance: QuickLinkKubeObject, config: QuickLinkKubeObjectConfig },
  ],
  delete: [{ instance: SecretKubeObject, config: SecretKubeObjectConfig }],
};
