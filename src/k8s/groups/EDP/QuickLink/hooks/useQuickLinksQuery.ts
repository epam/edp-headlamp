import { useQuery, UseQueryOptions } from 'react-query';
import { KubeObjectListInterface } from '../../../../../types/k8s';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';
import { QuickLinkKubeObject } from '../index';
import { REQUEST_KEY_QUERY_QUICK_LINKS } from '../requestKeys';
import { QuickLinkKubeObjectInterface } from '../types';

interface UseQuickLinksQueryProps<ReturnType> {
  props?: {
    namespace?: string;
  };
  options?: UseQueryOptions<
    KubeObjectListInterface<QuickLinkKubeObjectInterface>,
    Error,
    ReturnType
  >;
}

export const useQuickLinksQuery = <
  ReturnType = KubeObjectListInterface<QuickLinkKubeObjectInterface>
>({
  props,
  options,
}: UseQuickLinksQueryProps<ReturnType>) => {
  const namespace = props?.namespace || getDefaultNamespace();
  return useQuery<KubeObjectListInterface<QuickLinkKubeObjectInterface>, Error, ReturnType>(
    [REQUEST_KEY_QUERY_QUICK_LINKS, namespace],
    () => QuickLinkKubeObject.getList(namespace),
    options
  );
};
