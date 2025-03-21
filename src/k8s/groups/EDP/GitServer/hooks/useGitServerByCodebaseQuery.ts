import { useQuery } from 'react-query';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';
import { GitServerKubeObject } from '..';
import { REQUEST_KEY_QUERY_GIT_SERVER_BY_NAME } from '../requestKeys';
import { GitServerKubeObjectInterface } from '../types';

export const useGitServerByNameQuery = (
  name: string | undefined,
  namespace: string = getDefaultNamespace()
) => {
  return useQuery<GitServerKubeObjectInterface, Error>(
    REQUEST_KEY_QUERY_GIT_SERVER_BY_NAME,
    () => GitServerKubeObject.getByName(name!, namespace),
    {
      enabled: !!name,
    }
  );
};
