import { useQuery, UseQueryOptions } from 'react-query';
import { KubeObjectListInterface } from '../../../types/k8s';
import { EDPGitServerKubeObject } from '../index';
import { REQUEST_KEY_QUERY_GIT_SERVER_LIST } from '../requestKeys';
import { EDPGitServerKubeObjectInterface } from '../types';

export const useGitServerListQuery = <
    ReturnType = KubeObjectListInterface<EDPGitServerKubeObjectInterface>
>(
    options?: UseQueryOptions<
        KubeObjectListInterface<EDPGitServerKubeObjectInterface>,
        Error,
        ReturnType
    >
) => {
    return useQuery<KubeObjectListInterface<EDPGitServerKubeObjectInterface>, Error, ReturnType>(
        REQUEST_KEY_QUERY_GIT_SERVER_LIST,
        () => EDPGitServerKubeObject.getList(),
        options
    );
};
