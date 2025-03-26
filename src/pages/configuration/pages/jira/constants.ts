import { KubeObjectClass } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { EDP_OPERATOR_GUIDE } from '../../../../constants/urls';
import { SecretKubeObject } from '../../../../k8s/groups/default/Secret';
import { SecretKubeObjectConfig } from '../../../../k8s/groups/default/Secret/config';
import { JiraServerKubeObject } from '../../../../k8s/groups/EDP/JiraServer';
import { JiraServerKubeObjectConfig } from '../../../../k8s/groups/EDP/JiraServer/config';
import { PageDescription } from '../../../../types/pages';

export const pageDescription: PageDescription = {
  id: 'jira-integration',
  label: 'Jira',
  description: 'Track and deliver your projects with Jira.',
  routePath: '/configuration/jira-integration',
  docLink: EDP_OPERATOR_GUIDE.JIRA.url,
};

export const pagePermissionsToCheck = {
  create: [
    { instance: SecretKubeObject as unknown as KubeObjectClass, config: SecretKubeObjectConfig },
    {
      instance: JiraServerKubeObject as unknown as KubeObjectClass,
      config: JiraServerKubeObjectConfig,
    },
  ],
  update: [
    { instance: SecretKubeObject as unknown as KubeObjectClass, config: SecretKubeObjectConfig },
    {
      instance: JiraServerKubeObject as unknown as KubeObjectClass,
      config: JiraServerKubeObjectConfig,
    },
  ],
  delete: [
    { instance: SecretKubeObject as unknown as KubeObjectClass, config: SecretKubeObjectConfig },
  ],
};
