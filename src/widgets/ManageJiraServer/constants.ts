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
    { instance: SecretKubeObject, config: SecretKubeObjectConfig },
    { instance: JiraServerKubeObject, config: JiraServerKubeObjectConfig },
  ],
  update: [
    { instance: SecretKubeObject, config: SecretKubeObjectConfig },
    { instance: JiraServerKubeObject, config: JiraServerKubeObjectConfig },
  ],
  delete: [{ instance: SecretKubeObject, config: SecretKubeObjectConfig }],
};
