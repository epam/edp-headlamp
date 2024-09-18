import { SecretKubeObject } from '../../k8s/groups/default/Secret';
import { SecretKubeObjectConfig } from '../../k8s/groups/default/Secret/config';
import { QuickLinkKubeObject } from '../../k8s/groups/EDP/QuickLink';
import { QuickLinkKubeObjectConfig } from '../../k8s/groups/EDP/QuickLink/config';

export const FORM_NAMES = {
  QUICK_LINK: 'quickLink',
  SECRET: 'secret',
} as const;

export const widgetPermissionsToCheck = {
  create: [{ instance: SecretKubeObject, config: SecretKubeObjectConfig }],
  update: [
    { instance: SecretKubeObject, config: SecretKubeObjectConfig },
    { instance: QuickLinkKubeObject, config: QuickLinkKubeObjectConfig },
  ],
  delete: [{ instance: SecretKubeObject, config: SecretKubeObjectConfig }],
};
