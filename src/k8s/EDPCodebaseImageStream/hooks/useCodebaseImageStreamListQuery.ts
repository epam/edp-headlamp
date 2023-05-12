import { useQuery, UseQueryOptions } from 'react-query';
import { KubeObjectListInterface } from '../../../types/k8s';
import { EDPCodebaseImageStreamKubeObject } from '../index';
import { REQUEST_KEY_QUERY_CODEBASE_IMAGE_STREAM_LIST } from '../requestKeys';
import { EDPCodebaseImageStreamKubeObjectInterface } from '../types';

export const useCodebaseImageStreamListQuery = <
    ReturnType = KubeObjectListInterface<EDPCodebaseImageStreamKubeObjectInterface>
>(
    options?: UseQueryOptions<
        KubeObjectListInterface<EDPCodebaseImageStreamKubeObjectInterface>,
        Error,
        ReturnType
    >
) => {
    return useQuery<
        KubeObjectListInterface<EDPCodebaseImageStreamKubeObjectInterface>,
        Error,
        ReturnType
    >(
        REQUEST_KEY_QUERY_CODEBASE_IMAGE_STREAM_LIST,
        () => EDPCodebaseImageStreamKubeObject.getList(),
        options
    );
};
