import { useQuery, UseQueryOptions } from 'react-query';
import { getDefaultNamespace } from '../../../utils/getDefaultNamespace';
import { TriggerTemplateKubeObject } from '..';
import { REQUEST_KEY_QUERY_TRIGGER_TEMPLATE_BY_NAME } from '../requestKeys';
import { TriggerTemplateKubeObjectInterface } from '../types';

interface UseTriggerTemplateByNameQueryProps<ReturnType> {
  props: {
    name: string;
    namespace?: string;
  };
  options?: UseQueryOptions<TriggerTemplateKubeObjectInterface, Error, ReturnType>;
}

export const useTriggerTemplateByNameQuery = <ReturnType = TriggerTemplateKubeObjectInterface>({
  props,
  options,
}: UseTriggerTemplateByNameQueryProps<ReturnType>) => {
  const { name } = props;
  const namespace = props?.namespace || getDefaultNamespace();
  return useQuery<TriggerTemplateKubeObjectInterface, Error, ReturnType>(
    [REQUEST_KEY_QUERY_TRIGGER_TEMPLATE_BY_NAME, name],
    () => TriggerTemplateKubeObject.getItemByName(namespace, name),
    options
  );
};
