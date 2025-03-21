import { useQuery } from 'react-query';
import { KubeObjectListInterface } from '../../../../../types/k8s';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';
import { GitServerKubeObject } from '../index';
import { REQUEST_KEY_QUERY_GIT_SERVER_LIST } from '../requestKeys';
import { GitServerKubeObjectInterface } from '../types';

export const useGitServerListQuery = (namespace: string = getDefaultNamespace()) => {
  return useQuery<KubeObjectListInterface<GitServerKubeObjectInterface>, Error>(
    REQUEST_KEY_QUERY_GIT_SERVER_LIST,
    () => GitServerKubeObject.getList(namespace)
  );
};
