import { useQuery, UseQueryOptions } from 'react-query';
import { KubeObjectListInterface } from '../../../../../types/k8s';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';
import { ConfigMapKubeObject } from '..';
import { EDP_CONFIG_CONFIG_MAP_NAMES } from '../constants';
import { REQUEST_KEY_QUERY_CONFIG_MAP_LIST } from '../requestKeys';
import { ConfigMapKubeObjectInterface } from '../types';

interface UseClusterSecretListQueryProps<ReturnType = ConfigMapKubeObjectInterface> {
  props?: {
    namespace?: string;
  };
  options?: UseQueryOptions<
    KubeObjectListInterface<ConfigMapKubeObjectInterface>,
    Error,
    ReturnType
  >;
}

export const useEDPConfigMapQuery = <ReturnType = ConfigMapKubeObjectInterface>({
  props,
  options,
}: UseClusterSecretListQueryProps<ReturnType>) => {
  const namespace = props?.namespace || getDefaultNamespace();

  return useQuery<KubeObjectListInterface<ConfigMapKubeObjectInterface>, Error, ReturnType>(
    REQUEST_KEY_QUERY_CONFIG_MAP_LIST,
    () => ConfigMapKubeObject.getList(namespace),
    {
      ...options,
      select: (data): ReturnType =>
        data.items.find((item) =>
          EDP_CONFIG_CONFIG_MAP_NAMES.includes(item.metadata.name)
        ) as unknown as ReturnType,
    }
  );
};
