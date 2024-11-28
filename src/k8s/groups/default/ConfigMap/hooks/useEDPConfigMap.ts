import { useQuery, UseQueryOptions } from 'react-query';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';
import { REQUEST_KEY_QUERY_CLUSTER_SECRET_LIST } from '../../Secret/requestKeys';
import { ConfigMapKubeObject } from '..';
import { ConfigMapKubeObjectInterface } from '../types';

interface UseClusterSecretListQueryProps<ReturnType> {
  props?: {
    namespace?: string;
    name: string;
  };
  options?: UseQueryOptions<ConfigMapKubeObjectInterface, Error, ReturnType>;
}

export const useEDPConfigMapQuery = <ReturnType = ConfigMapKubeObjectInterface>({
  props,
  options,
}: UseClusterSecretListQueryProps<ReturnType>) => {
  const namespace = props?.namespace || getDefaultNamespace();

  return useQuery<ConfigMapKubeObjectInterface, Error, ReturnType>(
    REQUEST_KEY_QUERY_CLUSTER_SECRET_LIST,
    () => ConfigMapKubeObject.getItemByName(namespace, props.name),
    options
  );
};
