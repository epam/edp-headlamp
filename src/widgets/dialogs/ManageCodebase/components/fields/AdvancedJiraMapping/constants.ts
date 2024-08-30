import { AdvancedMappingItem } from './types';

export const advancedMappingBase: AdvancedMappingItem[] = [
  {
    label: 'Component/s',
    value: 'components',
    isUsed: false,
  },
  {
    label: 'FixVersion/s',
    value: 'fixVersions',
    isUsed: false,
  },
  {
    label: 'Labels',
    value: 'labels',
    isUsed: false,
  },
];

export const createAdvancedMappingRowName = (value: string): string => `mapping-row-${value}`;
