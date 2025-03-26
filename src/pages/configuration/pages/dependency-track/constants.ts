import { KubeObjectClass } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { EDP_OPERATOR_GUIDE } from '../../../../constants/urls';
import { SecretKubeObject } from '../../../../k8s/groups/default/Secret';
import { SecretKubeObjectConfig } from '../../../../k8s/groups/default/Secret/config';
import { QuickLinkKubeObject } from '../../../../k8s/groups/EDP/QuickLink';
import { QuickLinkKubeObjectConfig } from '../../../../k8s/groups/EDP/QuickLink/config';
import { PageDescription } from '../../../../types/pages';

export const pageDescription: PageDescription = {
  id: 'dependency-track-integration',
  label: 'DependencyTrack',
  description: 'Monitor and manage vulnerabilities within third-party components.',
  routePath: '/configuration/dependency-track-integration',
  docLink: EDP_OPERATOR_GUIDE.DEPENDENCY_TRACK.url,
};

export const pagePermissionsToCheck = {
  create: [
    { instance: SecretKubeObject as unknown as KubeObjectClass, config: SecretKubeObjectConfig },
  ],
  update: [
    { instance: SecretKubeObject as unknown as KubeObjectClass, config: SecretKubeObjectConfig },
    {
      instance: QuickLinkKubeObject as unknown as KubeObjectClass,
      config: QuickLinkKubeObjectConfig,
    },
  ],
  delete: [
    { instance: SecretKubeObject as unknown as KubeObjectClass, config: SecretKubeObjectConfig },
  ],
};
