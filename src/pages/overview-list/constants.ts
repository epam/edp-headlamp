import { QuickLinkKubeObject } from '../../k8s/groups/EDP/QuickLink';
import { QuickLinkKubeObjectConfig } from '../../k8s/groups/EDP/QuickLink/config';

export const permissionsToCheckConfig = {
  create: [{ instance: QuickLinkKubeObject, config: QuickLinkKubeObjectConfig }],
  update: [{ instance: QuickLinkKubeObject, config: QuickLinkKubeObjectConfig }],
  delete: [{ instance: QuickLinkKubeObject, config: QuickLinkKubeObjectConfig }],
};
