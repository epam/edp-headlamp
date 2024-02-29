import { useQuery, UseQueryOptions } from 'react-query';
import { KubeObjectListInterface } from '../../../types/k8s';
import { getDefaultNamespace } from '../../../utils/getDefaultNamespace';
import { TriggerTemplateKubeObject } from '..';
import { REQUEST_KEY_QUERY_TRIGGER_TEMPLATE_LIST_BY_TYPE } from '../requestKeys';
import { TriggerTemplateKubeObjectInterface } from '../types';

interface UseDeployTriggerTemplateListQueryProps<ReturnType> {
  props?: {
    namespace?: string;
  };
  options?: UseQueryOptions<
    KubeObjectListInterface<TriggerTemplateKubeObjectInterface>,
    Error,
    ReturnType
  >;
}

export const useDeployTriggerTemplateListQuery = <
  ReturnType = KubeObjectListInterface<TriggerTemplateKubeObjectInterface>
>({
  props,
  options,
}: UseDeployTriggerTemplateListQueryProps<ReturnType>) => {
  const namespace = props?.namespace || getDefaultNamespace();

  return useQuery<KubeObjectListInterface<TriggerTemplateKubeObjectInterface>, Error, ReturnType>(
    [REQUEST_KEY_QUERY_TRIGGER_TEMPLATE_LIST_BY_TYPE, 'deploy'],
    () => TriggerTemplateKubeObject.getListByTypeLabel(namespace, 'deploy'),
    options
  );
};
