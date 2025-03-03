import { useQuery, UseQueryOptions } from 'react-query';
import { KubeObjectListInterface } from '../../../../../types/k8s';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';
import { CodebaseKubeObject } from '../index';
import { REQUEST_KEY_QUERY_CODEBASE_LIST_BY_GIT_SERVER } from '../requestKeys';
import { CodebaseKubeObjectInterface } from '../types';

interface UseCodebasesByGitServerLabelQueryProps<ReturnType> {
  props: {
    codebaseGitServer: string;
    namespace?: string;
  };
  options?: UseQueryOptions<
    KubeObjectListInterface<CodebaseKubeObjectInterface>,
    Error,
    ReturnType
  >;
}

export const useCodebasesByGitServerLabelQuery = <
  ReturnType = KubeObjectListInterface<CodebaseKubeObjectInterface>
>({
  props,
  options,
}: UseCodebasesByGitServerLabelQueryProps<ReturnType>) => {
  const { codebaseGitServer } = props;
  const namespace = props?.namespace || getDefaultNamespace();
  return useQuery<KubeObjectListInterface<CodebaseKubeObjectInterface>, Error, ReturnType>(
    [REQUEST_KEY_QUERY_CODEBASE_LIST_BY_GIT_SERVER, codebaseGitServer],
    () => CodebaseKubeObject.getListByGitServerLabel(namespace, codebaseGitServer),
    options
  );
};
