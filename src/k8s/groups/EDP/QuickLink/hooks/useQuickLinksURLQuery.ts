import { useQuery } from 'react-query';
import { KubeObjectListInterface } from '../../../../../types/k8s';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';
import { QuickLinkKubeObject } from '..';
import { REQUEST_KEY_QUERY_QUICK_LINKS } from '../requestKeys';
import { QuickLinkKubeObjectInterface } from '../types';

export type QuickLinksURLS = Record<string, string>;

export const useQuickLinksURLsQuery = (namespace: string = getDefaultNamespace()) => {
  return useQuery<
    KubeObjectListInterface<QuickLinkKubeObjectInterface>,
    Error,
    QuickLinksURLS | undefined
  >({
    queryKey: [REQUEST_KEY_QUERY_QUICK_LINKS, namespace],
    queryFn: () => QuickLinkKubeObject.getList(namespace),
    select: (data) =>
      data.items.reduce<Record<string, string>>((acc, cur) => {
        acc[cur.metadata.name] = cur.spec.url;
        return acc;
      }, {}),
  });
};
