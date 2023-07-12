import { useQuery, UseQueryOptions } from 'react-query';
import { KubeObjectListInterface } from '../../../types/k8s';
import { getDefaultNamespace } from '../../../utils/getDefaultNamespace';
import { EDPTemplateKubeObject } from '../index';
import { REQUEST_KEY_QUERY_TEMPLATE_LIST } from '../requestKeys';
import { EDPTemplateKubeObjectInterface } from '../types';

interface UseEDPTemplateListQueryProps<ReturnType> {
    props?: {
        namespace?: string;
    };
    options?: UseQueryOptions<
        KubeObjectListInterface<EDPTemplateKubeObjectInterface>,
        Error,
        ReturnType
    >;
}

export const useEDPTemplateListQuery = <
    ReturnType = KubeObjectListInterface<EDPTemplateKubeObjectInterface>
>({
    props,
    options,
}: UseEDPTemplateListQueryProps<ReturnType>) => {
    const namespace = props?.namespace || getDefaultNamespace();

    return useQuery<KubeObjectListInterface<EDPTemplateKubeObjectInterface>, Error, ReturnType>(
        REQUEST_KEY_QUERY_TEMPLATE_LIST,
        () => EDPTemplateKubeObject.getList(namespace),
        options
    );
};
