import { useQuery } from 'react-query';
import { KubeObjectListInterface } from '../../../../../types/k8s';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';
import { JiraServerKubeObject } from '..';
import { REQUEST_KEY_QUERY_JIRA_SERVER_LIST } from '../requestKeys';
import { JiraServerKubeObjectInterface } from '../types';

export const useJiraServerNameListQuery = (namespace: string = getDefaultNamespace()) => {
  return useQuery<KubeObjectListInterface<JiraServerKubeObjectInterface>, Error, string[]>(
    REQUEST_KEY_QUERY_JIRA_SERVER_LIST,
    () => JiraServerKubeObject.getList(namespace),
    {
      select: (data) => data.items.map((el) => el.metadata.name),
    }
  );
};
