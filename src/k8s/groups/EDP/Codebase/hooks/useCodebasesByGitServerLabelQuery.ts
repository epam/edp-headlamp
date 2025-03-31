import { useQuery } from 'react-query';
import { KubeObjectListInterface } from '../../../../../types/k8s';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';
import { CodebaseKubeObject } from '../index';
import { REQUEST_KEY_QUERY_CODEBASE_LIST_BY_GIT_SERVER } from '../requestKeys';
import { CodebaseKubeObjectInterface } from '../types';

export const useCodebasesByGitServerLabelQuery = (
  codebaseGitServer: string | undefined,
  namespace: string = getDefaultNamespace()
) => {
  return useQuery<KubeObjectListInterface<CodebaseKubeObjectInterface>, Error>(
    [REQUEST_KEY_QUERY_CODEBASE_LIST_BY_GIT_SERVER, codebaseGitServer],
    () => CodebaseKubeObject.getListByGitServerLabel(namespace, codebaseGitServer!),
    {
      enabled: !!codebaseGitServer,
    }
  );
};
