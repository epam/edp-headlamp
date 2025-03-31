import { KubeObjectClass } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { EDP_USER_GUIDE } from '../../../../constants/urls';
import { SecretKubeObject } from '../../../../k8s/groups/default/Secret';
import { SecretKubeObjectConfig } from '../../../../k8s/groups/default/Secret/config';
import { GitServerKubeObject } from '../../../../k8s/groups/EDP/GitServer';
import { GitServerKubeObjectConfig } from '../../../../k8s/groups/EDP/GitServer/config';
import { PageDescription } from '../../../../types/pages';

export const pageDescription: PageDescription = {
  id: 'git-server-list',
  label: 'Git Servers',
  description: 'Integrate platform with Version Control Systems.',
  docLink: EDP_USER_GUIDE.GIT_SERVER_MANAGE.anchors.VIEW_DATA.url,
  routePath: '/configuration/gitservers',
};

export const pagePermissionsToCheck = {
  create: [
    { instance: SecretKubeObject as unknown as KubeObjectClass, config: SecretKubeObjectConfig },
    {
      instance: GitServerKubeObject as unknown as KubeObjectClass,
      config: GitServerKubeObjectConfig,
    },
  ],
  update: [
    { instance: SecretKubeObject as unknown as KubeObjectClass, config: SecretKubeObjectConfig },
    {
      instance: GitServerKubeObject as unknown as KubeObjectClass,
      config: GitServerKubeObjectConfig,
    },
  ],
  delete: [
    { instance: SecretKubeObject as unknown as KubeObjectClass, config: SecretKubeObjectConfig },
    {
      instance: GitServerKubeObject as unknown as KubeObjectClass,
      config: GitServerKubeObjectConfig,
    },
  ],
};
