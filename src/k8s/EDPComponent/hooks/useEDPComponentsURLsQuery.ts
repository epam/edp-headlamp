import { getDefaultNamespace } from '../../../utils/getDefaultNamespace';
import { useEDPComponentsQuery } from './useEDPComponentsQuery';

type EDPComponentName = string;
type EDPComponentURL = string;

export type EDPComponentsURLS = {
  [componentName: EDPComponentName]: EDPComponentURL;
};

export const useEDPComponentsURLsQuery = (namespace?: string) => {
  return useEDPComponentsQuery<EDPComponentsURLS>({
    props: {
      namespace: namespace || getDefaultNamespace(),
    },
    options: {
      select: data =>
        data.items.reduce((acc, cur) => {
          acc[cur.spec.type] = cur.spec.url;
          return acc;
        }, {}),
    },
  });
};
