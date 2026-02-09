import { useQuery } from 'react-query';
import { KubeObjectListInterface } from '../../../../../types/k8s';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';
import { TriggerTemplateKubeObject } from '..';
import { REQUEST_KEY_QUERY_TRIGGER_TEMPLATE_LIST_BY_TYPE } from '../requestKeys';
import { TriggerTemplateKubeObjectInterface } from '../types';

export const useDeployTriggerTemplateListQuery = (namespace: string = getDefaultNamespace()) => {
  return useQuery<KubeObjectListInterface<TriggerTemplateKubeObjectInterface>, Error>(
    [REQUEST_KEY_QUERY_TRIGGER_TEMPLATE_LIST_BY_TYPE, 'deploy'],
    () => TriggerTemplateKubeObject.getListByTypeLabel(namespace, 'deploy')
  );
};
