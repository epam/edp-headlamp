import { useQuery, UseQueryOptions } from 'react-query';
import { KubeObjectListInterface } from '../../../types/k8s';
import { getDefaultNamespace } from '../../../utils/getDefaultNamespace';
import { EDPCodebaseImageStreamKubeObject } from '../index';
import { REQUEST_KEY_QUERY_CODEBASE_IMAGE_STREAM_LIST } from '../requestKeys';
import { EDPCodebaseImageStreamKubeObjectInterface } from '../types';

interface UseCodebaseImageStreamListQueryProps<ReturnType> {
  props?: {
    namespace?: string;
  };
  options?: UseQueryOptions<
    KubeObjectListInterface<EDPCodebaseImageStreamKubeObjectInterface>,
    Error,
    ReturnType
  >;
}

export const useCodebaseImageStreamListQuery = <
  ReturnType = KubeObjectListInterface<EDPCodebaseImageStreamKubeObjectInterface>
>({
  props,
  options,
}: UseCodebaseImageStreamListQueryProps<ReturnType>) => {
  const namespace = props?.namespace || getDefaultNamespace();

  return useQuery<
    KubeObjectListInterface<EDPCodebaseImageStreamKubeObjectInterface>,
    Error,
    ReturnType
  >(
    REQUEST_KEY_QUERY_CODEBASE_IMAGE_STREAM_LIST,
    () => EDPCodebaseImageStreamKubeObject.getList(namespace),
    options
  );
};
