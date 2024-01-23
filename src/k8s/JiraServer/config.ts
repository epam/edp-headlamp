import { KubeObjectConfig } from '../../types/configs/k8s';

export const JiraServerKubeObjectConfig: KubeObjectConfig = {
  kind: 'JiraServer',
  name: {
    singularForm: 'jiraserver',
    pluralForm: 'jiraservers',
  },
  group: 'v2.edp.epam.com',
  version: 'v1',
};
