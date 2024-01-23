import { useQuery, UseQueryOptions } from 'react-query';
import { KubeObjectListInterface } from '../../../types/k8s';
import { getDefaultNamespace } from '../../../utils/getDefaultNamespace';
import { EDPGitServerKubeObject } from '../index';
import { REQUEST_KEY_QUERY_GIT_SERVER_LIST } from '../requestKeys';
import { EDPGitServerKubeObjectInterface } from '../types';

interface UseGitServerListQueryProps<ReturnType> {
  props?: {
    namespace?: string;
  };
  options?: UseQueryOptions<
    KubeObjectListInterface<EDPGitServerKubeObjectInterface>,
    Error,
    ReturnType
  >;
}

export const useGitServerListQuery = <
  ReturnType = KubeObjectListInterface<EDPGitServerKubeObjectInterface>
>({
  props,
  options,
}: UseGitServerListQueryProps<ReturnType>) => {
  const namespace = props?.namespace || getDefaultNamespace();

  return useQuery<KubeObjectListInterface<EDPGitServerKubeObjectInterface>, Error, ReturnType>(
    REQUEST_KEY_QUERY_GIT_SERVER_LIST,
    () => EDPGitServerKubeObject.getList(namespace),
    options
  );
};
