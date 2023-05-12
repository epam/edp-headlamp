import { useQuery, UseQueryOptions } from 'react-query';
import { KubeObjectListInterface } from '../../../types/k8s';
import { EDPComponentKubeObject } from '../index';
import { REQUEST_KEY_QUERY_EDP_COMPONENTS } from '../requestKeys';
import { EDPComponentKubeObjectInterface } from '../types';

export const useEDPComponentsQuery = <
    ReturnType = KubeObjectListInterface<EDPComponentKubeObjectInterface>
>(
    options?: UseQueryOptions<
        KubeObjectListInterface<EDPComponentKubeObjectInterface>,
        Error,
        ReturnType
    >
) => {
    return useQuery<KubeObjectListInterface<EDPComponentKubeObjectInterface>, Error, ReturnType>(
        REQUEST_KEY_QUERY_EDP_COMPONENTS,
        () => EDPComponentKubeObject.getList(),
        options
    );
};
