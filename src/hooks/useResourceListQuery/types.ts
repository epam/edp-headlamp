import { UseQueryOptions, UseQueryResult } from 'react-query';
import { KubeObjectListInterface } from '../../types/k8s';

export interface UseResourceListQueryProps<Resource> {
    queryKey: string;
    queryFn: (namespace: string) => Promise<KubeObjectListInterface<Resource>>;
    options: UseQueryOptions<
        KubeObjectListInterface<Resource>,
        Error,
        KubeObjectListInterface<Resource>
    >;
}

export type UseResourceListQueryReturnType<Resource> = UseQueryResult<
    KubeObjectListInterface<Resource>,
    Error
>;
