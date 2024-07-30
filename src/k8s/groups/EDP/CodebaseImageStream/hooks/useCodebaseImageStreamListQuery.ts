import { useQuery, UseQueryOptions } from 'react-query';
import { KubeObjectListInterface } from '../../../../../types/k8s';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';
import { CodebaseImageStreamKubeObject } from '../index';
import { REQUEST_KEY_QUERY_CODEBASE_IMAGE_STREAM_LIST } from '../requestKeys';
import { CodebaseImageStreamKubeObjectInterface } from '../types';

interface UseCodebaseImageStreamListQueryProps<ReturnType> {
  props?: {
    namespace?: string;
  };
  options?: UseQueryOptions<
    KubeObjectListInterface<CodebaseImageStreamKubeObjectInterface>,
    Error,
    ReturnType
  >;
}

export const useCodebaseImageStreamListQuery = <
  ReturnType = KubeObjectListInterface<CodebaseImageStreamKubeObjectInterface>
>({
  props,
  options,
}: UseCodebaseImageStreamListQueryProps<ReturnType>) => {
  const namespace = props?.namespace || getDefaultNamespace();

  return useQuery<
    KubeObjectListInterface<CodebaseImageStreamKubeObjectInterface>,
    Error,
    ReturnType
  >(
    REQUEST_KEY_QUERY_CODEBASE_IMAGE_STREAM_LIST,
    () => CodebaseImageStreamKubeObject.getList(namespace),
    options
  );
};
