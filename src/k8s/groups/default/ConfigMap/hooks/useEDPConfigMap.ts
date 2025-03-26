import { useQuery } from 'react-query';
import { KubeObjectListInterface } from '../../../../../types/k8s';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';
import { ConfigMapKubeObject } from '..';
import { EDP_CONFIG_CONFIG_MAP_NAMES } from '../constants';
import { REQUEST_KEY_QUERY_CONFIG_MAP_LIST } from '../requestKeys';
import { ConfigMapKubeObjectInterface } from '../types';

export const useEDPConfigMapQuery = (namespace: string = getDefaultNamespace()) => {
  return useQuery<
    KubeObjectListInterface<ConfigMapKubeObjectInterface>,
    Error,
    ConfigMapKubeObjectInterface | undefined
  >(REQUEST_KEY_QUERY_CONFIG_MAP_LIST, () => ConfigMapKubeObject.getList(namespace), {
    select: (data) =>
      data.items.find((item) => EDP_CONFIG_CONFIG_MAP_NAMES.includes(item.metadata.name)),
  });
};
