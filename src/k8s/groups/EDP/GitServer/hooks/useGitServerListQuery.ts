import { useQuery, UseQueryOptions } from 'react-query';
import { KubeObjectListInterface } from '../../../../../types/k8s';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';
import { GitServerKubeObject } from '../index';
import { REQUEST_KEY_QUERY_GIT_SERVER_LIST } from '../requestKeys';
import { GitServerKubeObjectInterface } from '../types';

interface UseGitServerListQueryProps<ReturnType> {
  props?: {
    namespace?: string;
  };
  options?: UseQueryOptions<
    KubeObjectListInterface<GitServerKubeObjectInterface>,
    Error,
    ReturnType
  >;
}

export const useGitServerListQuery = <
  ReturnType = KubeObjectListInterface<GitServerKubeObjectInterface>
>({
  props,
  options,
}: UseGitServerListQueryProps<ReturnType>) => {
  const namespace = props?.namespace || getDefaultNamespace();

  return useQuery<KubeObjectListInterface<GitServerKubeObjectInterface>, Error, ReturnType>(
    REQUEST_KEY_QUERY_GIT_SERVER_LIST,
    () => GitServerKubeObject.getList(namespace),
    options
  );
};
