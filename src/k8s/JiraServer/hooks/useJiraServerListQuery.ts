import { useQuery, UseQueryOptions } from 'react-query';
import { KubeObjectListInterface } from '../../../types/k8s';
import { JiraServerKubeObject } from '../index';
import { REQUEST_KEY_QUERY_JIRA_SERVER_LIST } from '../requestKeys';
import { JiraServerKubeObjectInterface } from '../types';

export const useJiraServerListQuery = <
    ReturnType = KubeObjectListInterface<JiraServerKubeObjectInterface>
>(
    options?: UseQueryOptions<
        KubeObjectListInterface<JiraServerKubeObjectInterface>,
        Error,
        ReturnType
    >
) => {
    return useQuery<KubeObjectListInterface<JiraServerKubeObjectInterface>, Error, ReturnType>(
        REQUEST_KEY_QUERY_JIRA_SERVER_LIST,
        () => JiraServerKubeObject.getList(),
        options
    );
};
