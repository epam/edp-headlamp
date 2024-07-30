import { useQuery, UseQueryOptions } from 'react-query';
import { KubeObjectListInterface } from '../../../../../types/k8s';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';
import { TriggerTemplateKubeObject } from '../index';
import { REQUEST_KEY_QUERY_TRIGGER_TEMPLATE_LIST } from '../requestKeys';
import { TriggerTemplateKubeObjectInterface } from '../types';

interface UseTriggerTemplateListQueryProps<ReturnType> {
  props?: {
    namespace?: string;
  };
  options?: UseQueryOptions<
    KubeObjectListInterface<TriggerTemplateKubeObjectInterface>,
    Error,
    ReturnType
  >;
}

export const useTriggerTemplateListQuery = <
  ReturnType = KubeObjectListInterface<TriggerTemplateKubeObjectInterface>
>({
  props,
  options,
}: UseTriggerTemplateListQueryProps<ReturnType>) => {
  const namespace = props?.namespace || getDefaultNamespace();

  return useQuery<KubeObjectListInterface<TriggerTemplateKubeObjectInterface>, Error, ReturnType>(
    REQUEST_KEY_QUERY_TRIGGER_TEMPLATE_LIST,
    () => TriggerTemplateKubeObject.getList(namespace),
    options
  );
};
