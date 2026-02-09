import { useQuery } from 'react-query';
import { KubeObjectListInterface } from '../../../../../types/k8s';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';
import { QuickLinkKubeObject } from '../index';
import { REQUEST_KEY_QUERY_QUICK_LINKS } from '../requestKeys';
import { QuickLinkKubeObjectInterface } from '../types';

export const useQuickLinksQuery = (namespace: string = getDefaultNamespace()) => {
  return useQuery<KubeObjectListInterface<QuickLinkKubeObjectInterface>, Error>(
    [REQUEST_KEY_QUERY_QUICK_LINKS, namespace],
    () => QuickLinkKubeObject.getList(namespace)
  );
};
