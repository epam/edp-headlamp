import { getDefaultNamespace } from '../../../utils/getDefaultNamespace';
import { useQuickLinksQuery } from './useQuickLinksQuery';

export type QuickLinksURLS = Record<string, string>;

export const useQuickLinksURLsQuery = (namespace?: string) => {
  return useQuickLinksQuery<QuickLinksURLS>({
    props: {
      namespace: namespace || getDefaultNamespace(),
    },
    options: {
      select: (data) =>
        data.items.reduce((acc, cur) => {
          acc[cur.metadata.name] = cur.spec.url;
          return acc;
        }, {}),
    },
  });
};
