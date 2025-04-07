import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';

export const DEFAULT_CONTROLS = {
  SEARCH: 'search',
  NAMESPACE: 'namespace',
} as const;

export const searchFunction = (item: KubeObjectInterface, _value: string): boolean => {
  if (!item || !_value) {
    return true;
  }

  const value = _value.toLowerCase().trim();

  if (value.includes(':')) {
    const _value = value.replaceAll(' ', '');
    const [key, searchValue] = _value.split(':');

    return !!item?.metadata.labels?.[key]?.includes(searchValue);
  }

  if (item.spec?.displayName) {
    return item.spec.displayName.toLowerCase().trim().includes(value);
  }

  return (
    item?.metadata?.name?.includes(value) ||
    Object.keys(item?.metadata?.labels || {}).includes(value)
  );
};

export const namespaceFunction = (item: KubeObjectInterface, values: string[]): boolean =>
  values.length === 0 || values.includes(item.metadata?.namespace || '');
