import { KubeObjectClass } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { SecretKubeObject } from '../../k8s/groups/default/Secret';
import { SecretKubeObjectConfig } from '../../k8s/groups/default/Secret/config';
import { JiraServerKubeObject } from '../../k8s/groups/EDP/JiraServer';
import { JiraServerKubeObjectConfig } from '../../k8s/groups/EDP/JiraServer/config';

export const FORM_NAMES = {
  JIRA_SERVER: 'jiraServer',
  SECRET: 'secret',
} as const;

export const widgetPermissionsToCheck = {
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
