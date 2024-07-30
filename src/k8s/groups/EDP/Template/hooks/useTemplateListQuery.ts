import { useQuery, UseQueryOptions } from 'react-query';
import { KubeObjectListInterface } from '../../../../../types/k8s';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';
import { TemplateKubeObject } from '../index';
import { REQUEST_KEY_QUERY_TEMPLATE_LIST } from '../requestKeys';
import { TemplateKubeObjectInterface } from '../types';

interface UseEDPTemplateListQueryProps<ReturnType> {
  props?: {
    namespace?: string;
  };
  options?: UseQueryOptions<
    KubeObjectListInterface<TemplateKubeObjectInterface>,
    Error,
    ReturnType
  >;
}

export const useEDPTemplateListQuery = <
  ReturnType = KubeObjectListInterface<TemplateKubeObjectInterface>
>({
  props,
  options,
}: UseEDPTemplateListQueryProps<ReturnType>) => {
  const namespace = props?.namespace || getDefaultNamespace();

  return useQuery<KubeObjectListInterface<TemplateKubeObjectInterface>, Error, ReturnType>(
    REQUEST_KEY_QUERY_TEMPLATE_LIST,
    () => TemplateKubeObject.getList(namespace),
    options
  );
};
