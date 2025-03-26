import { KubeObjectClass } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { EDP_USER_GUIDE } from '../../../../constants/urls';
import { ApplicationKubeObject } from '../../../../k8s/groups/ArgoCD/Application';
import { ApplicationKubeObjectConfig } from '../../../../k8s/groups/ArgoCD/Application/config';
import { SecretKubeObject } from '../../../../k8s/groups/default/Secret';
import { SecretKubeObjectConfig } from '../../../../k8s/groups/default/Secret/config';
import { PageDescription } from '../../../../types/pages';

export const pageDescription: PageDescription = {
  id: 'cluster-list',
  label: 'Clusters',
  description: 'Scale workloads across multiple Kubernetes clusters.',
  routePath: '/configuration/clusters',
  docLink: EDP_USER_GUIDE.MANAGE_CLUSTER.url,
};

export const pagePermissionsToCheck = {
  create: [
    { instance: SecretKubeObject as unknown as KubeObjectClass, config: SecretKubeObjectConfig },
    {
      instance: ApplicationKubeObject as unknown as KubeObjectClass,
      config: ApplicationKubeObjectConfig,
    },
  ],
  update: [
    { instance: SecretKubeObject as unknown as KubeObjectClass, config: SecretKubeObjectConfig },
    {
      instance: ApplicationKubeObject as unknown as KubeObjectClass,
      config: ApplicationKubeObjectConfig,
    },
  ],
  delete: [
    { instance: SecretKubeObject as unknown as KubeObjectClass, config: SecretKubeObjectConfig },
    {
      instance: ApplicationKubeObject as unknown as KubeObjectClass,
      config: ApplicationKubeObjectConfig,
    },
  ],
};
