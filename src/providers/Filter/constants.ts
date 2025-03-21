import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';

export const DEFAULT_CONTROLS = {
  SEARCH: 'search',
  NAMESPACE: 'namespace',
} as const;

export const searchFunction = (item: KubeObjectInterface, value: string): boolean => {
  if (!item || !value) {
    return true;
  }

  if (value.includes(':')) {
    const _value = value.replaceAll(' ', '');
    const [key, searchValue] = _value.split(':');

    return !!item?.metadata.labels?.[key]?.includes(searchValue);
  }

  return (
    item?.metadata?.name?.includes(value) ||
    Object.keys(item?.metadata?.labels || {}).includes(value)
  );
};

export const namespaceFunction = (item: KubeObjectInterface, values: string[]): boolean =>
  values.length === 0 || values.includes(item.metadata?.namespace || '');
