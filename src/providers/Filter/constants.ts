import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';

export const DEFAULT_CONTROLS = {
  SEARCH: 'search',
  NAMESPACE: 'namespace',
} as const;

export const searchFunction = (item: KubeObjectInterface, value: string) => {
  if (!item || !value) {
    return true;
  }

  const usedMatchCriteria = [
    item.metadata.uid.toLowerCase(),
    item.metadata.namespace ? item.metadata.namespace.toLowerCase() : '',
    item.metadata.name.toLowerCase(),
    item?.spec?.displayName?.toLowerCase(),
  ].filter(Boolean);

  return usedMatchCriteria.some((item) => item.includes(value.toLowerCase()));
};

export const namespaceFunction = (item: KubeObjectInterface, values: string[]) =>
  values.length === 0 || values.includes(item.metadata.namespace);
