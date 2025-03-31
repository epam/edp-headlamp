import { useQuery } from 'react-query';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';
import { TriggerTemplateKubeObject } from '..';
import { REQUEST_KEY_QUERY_TRIGGER_TEMPLATE_BY_NAME } from '../requestKeys';
import { TriggerTemplateKubeObjectInterface } from '../types';

export const useTriggerTemplateByNameQuery = (
  name: string,
  namespace: string = getDefaultNamespace()
) => {
  return useQuery<TriggerTemplateKubeObjectInterface, Error>(
    [REQUEST_KEY_QUERY_TRIGGER_TEMPLATE_BY_NAME, name],
    () => TriggerTemplateKubeObject.getItemByName(namespace, name),
    {
      enabled: !!name,
    }
  );
};
