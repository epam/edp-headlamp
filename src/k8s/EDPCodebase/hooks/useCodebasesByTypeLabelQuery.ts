import { useQuery, UseQueryOptions } from 'react-query';
import { CODEBASE_TYPES } from '../../../constants/codebaseTypes';
import { KubeObjectListInterface } from '../../../types/k8s';
import { EDPCodebaseKubeObject } from '../index';
import { REQUEST_KEY_QUERY_CODEBASE_LIST_BY_TYPE } from '../requestKeys';
import { EDPCodebaseKubeObjectInterface } from '../types';

export const useCodebasesByTypeLabelQuery = <
    ReturnType = KubeObjectListInterface<EDPCodebaseKubeObjectInterface>
>(
    codebaseType: CODEBASE_TYPES,
    options?: UseQueryOptions<
        KubeObjectListInterface<EDPCodebaseKubeObjectInterface>,
        Error,
        ReturnType
    >
) => {
    return useQuery<KubeObjectListInterface<EDPCodebaseKubeObjectInterface>, Error, ReturnType>(
        [REQUEST_KEY_QUERY_CODEBASE_LIST_BY_TYPE, codebaseType],
        () => EDPCodebaseKubeObject.getListByTypeLabel(codebaseType),
        options
    );
};
