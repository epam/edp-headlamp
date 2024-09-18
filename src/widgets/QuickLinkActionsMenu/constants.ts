import { QuickLinkKubeObject } from '../../k8s/groups/EDP/QuickLink';
import { QuickLinkKubeObjectConfig } from '../../k8s/groups/EDP/QuickLink/config';

export const widgetPermissionsToCheck = {
  create: [],
  update: [{ instance: QuickLinkKubeObject, config: QuickLinkKubeObjectConfig }],
  delete: [{ instance: QuickLinkKubeObject, config: QuickLinkKubeObjectConfig }],
};
