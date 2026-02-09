import { KubeObjectClass } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { SecretKubeObject } from '../../k8s/groups/default/Secret';
import { SecretKubeObjectConfig } from '../../k8s/groups/default/Secret/config';
import { GitServerKubeObject } from '../../k8s/groups/EDP/GitServer';
import { GitServerKubeObjectConfig } from '../../k8s/groups/EDP/GitServer/config';

export const FORM_NAMES = {
  SHARED: 'shared',
  GIT_SERVER: 'gitServer',
  CREDENTIALS: 'credentials',
} as const;

export const GIT_USER = {
  GERRIT: 'edp-ci',
  GITHUB: 'git',
  GITLAB: 'git',
  BITBUCKET: 'git',
};

export const widgetPermissionsToCheck = {
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
