import { JiraServerKubeObjectConfig } from '../../config';
import { JiraServerKubeObjectInterface } from '../../types';

const { group, version, kind } = JiraServerKubeObjectConfig;

export const createJiraServerInstance = (url: string): JiraServerKubeObjectInterface => {
  return {
    apiVersion: `${group}/${version}`,
    kind: kind,
    // @ts-ignore
    metadata: {
      name: 'epam-jira',
    },
    spec: {
      apiUrl: url,
      rootUrl: url,
      credentialName: 'ci-jira',
    },
  };
};
