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
    const cleanedValue = value.replaceAll(' ', '');
    const [key, searchValue] = cleanedValue.split(':');

    return !!item?.metadata?.labels?.[key]?.toLowerCase()?.includes(searchValue);
  }

  return (
    Object.keys(item?.metadata?.labels || {}).some((labelKey) =>
      labelKey.toLowerCase().includes(value)
    ) ||
    item?.metadata?.name?.toLowerCase().includes(value) ||
    item.spec?.displayName?.toLowerCase().includes(value)
  );
};

export const namespaceFunction = (item: KubeObjectInterface, values: string[]): boolean =>
  values.length === 0 || values.includes(item.metadata?.namespace || '');
