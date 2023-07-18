import { useQuery, UseQueryOptions } from 'react-query';
import { KubeObjectListInterface } from '../../../types/k8s';
import { getDefaultNamespace } from '../../../utils/getDefaultNamespace';
import { SecretKubeObject } from '../index';
import { REQUEST_KEY_QUERY_CLUSTER_SECRET_LIST } from '../requestKeys';
import { SecretKubeObjectInterface } from '../types';

interface UseClusterSecretListQueryProps<ReturnType> {
    props?: {
        namespace?: string;
    };
    options?: UseQueryOptions<
        KubeObjectListInterface<SecretKubeObjectInterface>,
        Error,
        ReturnType
    >;
}

export const useClusterSecretListQuery = <
    ReturnType = KubeObjectListInterface<SecretKubeObjectInterface>
>({
    props,
    options,
}: UseClusterSecretListQueryProps<ReturnType>) => {
    const namespace = props?.namespace || getDefaultNamespace();

    return useQuery<KubeObjectListInterface<SecretKubeObjectInterface>, Error, ReturnType>(
        REQUEST_KEY_QUERY_CLUSTER_SECRET_LIST,
        () => SecretKubeObject.getClusterSecretList(namespace),
        options
    );
};
