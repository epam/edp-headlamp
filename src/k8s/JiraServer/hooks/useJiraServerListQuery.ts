import { useQuery, UseQueryOptions } from 'react-query';
import { KubeObjectListInterface } from '../../../types/k8s';
import { getDefaultNamespace } from '../../../utils/getDefaultNamespace';
import { JiraServerKubeObject } from '../index';
import { REQUEST_KEY_QUERY_JIRA_SERVER_LIST } from '../requestKeys';
import { JiraServerKubeObjectInterface } from '../types';

interface UseJiraServerListQueryProps<ReturnType> {
    props?: {
        namespace?: string;
    };
    options?: UseQueryOptions<
        KubeObjectListInterface<JiraServerKubeObjectInterface>,
        Error,
        ReturnType
    >;
}

export const useJiraServerListQuery = <
    ReturnType = KubeObjectListInterface<JiraServerKubeObjectInterface>
>({
    props,
    options,
}: UseJiraServerListQueryProps<ReturnType>) => {
    const namespace = props?.namespace || getDefaultNamespace();

    return useQuery<KubeObjectListInterface<JiraServerKubeObjectInterface>, Error, ReturnType>(
        REQUEST_KEY_QUERY_JIRA_SERVER_LIST,
        () => JiraServerKubeObject.getList(namespace),
        options
    );
};
