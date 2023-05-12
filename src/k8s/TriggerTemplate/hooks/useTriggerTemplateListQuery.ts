import { useQuery, UseQueryOptions } from 'react-query';
import { KubeObjectListInterface } from '../../../types/k8s';
import { TriggerTemplateKubeObject } from '../index';
import { REQUEST_KEY_QUERY_TRIGGER_TEMPLATE_LIST } from '../requestKeys';
import { TriggerTemplateKubeObjectInterface } from '../types';

export const useTriggerTemplateListQuery = <
    ReturnType = KubeObjectListInterface<TriggerTemplateKubeObjectInterface>
>(
    options?: UseQueryOptions<
        KubeObjectListInterface<TriggerTemplateKubeObjectInterface>,
        Error,
        ReturnType
    >
) => {
    return useQuery<KubeObjectListInterface<TriggerTemplateKubeObjectInterface>, Error, ReturnType>(
        REQUEST_KEY_QUERY_TRIGGER_TEMPLATE_LIST,
        () => TriggerTemplateKubeObject.getList(),
        options
    );
};
