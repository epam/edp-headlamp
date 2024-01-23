import { useQuery, UseQueryOptions } from 'react-query';
import { KubeObjectListInterface } from '../../../types/k8s';
import { getDefaultNamespace } from '../../../utils/getDefaultNamespace';
import { EDPComponentKubeObject } from '../index';
import { REQUEST_KEY_QUERY_EDP_COMPONENTS } from '../requestKeys';
import { EDPComponentKubeObjectInterface } from '../types';

interface UseEDPComponentsQueryProps<ReturnType> {
  props?: {
    namespace?: string;
  };
  options?: UseQueryOptions<
    KubeObjectListInterface<EDPComponentKubeObjectInterface>,
    Error,
    ReturnType
  >;
}

export const useEDPComponentsQuery = <
  ReturnType = KubeObjectListInterface<EDPComponentKubeObjectInterface>
>({
  props,
  options,
}: UseEDPComponentsQueryProps<ReturnType>) => {
  const namespace = props?.namespace || getDefaultNamespace();
  return useQuery<KubeObjectListInterface<EDPComponentKubeObjectInterface>, Error, ReturnType>(
    [REQUEST_KEY_QUERY_EDP_COMPONENTS, namespace],
    () => EDPComponentKubeObject.getList(namespace),
    options
  );
};
