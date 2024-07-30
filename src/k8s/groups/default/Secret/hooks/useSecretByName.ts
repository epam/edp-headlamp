import { useQuery, UseQueryOptions } from 'react-query';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';
import { SecretKubeObject } from '../index';
import { REQUEST_KEY_QUERY_SECRET_BY_NAME } from '../requestKeys';
import { SecretKubeObjectInterface } from '../types';

interface UseSecretByNameQueryProps<ReturnType> {
  props?: {
    namespace?: string;
    name?: string;
  };
  options?: UseQueryOptions<SecretKubeObjectInterface, Error, ReturnType>;
}

export const useSecretByNameQuery = <ReturnType = SecretKubeObjectInterface>({
  props,
  options,
}: UseSecretByNameQueryProps<ReturnType>) => {
  const namespace = props?.namespace || getDefaultNamespace();
  const { name } = props;

  return useQuery<SecretKubeObjectInterface, Error, ReturnType>(
    [REQUEST_KEY_QUERY_SECRET_BY_NAME, name],
    () => SecretKubeObject.getSecretByName(namespace, name),
    options
  );
};
