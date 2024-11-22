import { Theme } from '@mui/material';
import { ResourceQuotaKubeObjectInterface } from '../../k8s/groups/default/ResourceQuota/types';
import { ParsedQuotas, QuotaDetails } from './types';

export const convertToNumber = (value: string): number => {
  const numericValue = parseFloat(value);

  if (value.match(/m$/)) {
    return numericValue / 1000;
  } else if (value.match(/Gi$/)) {
    return numericValue * 1024;
  } else if (value.match(/Mi$/)) {
    return numericValue;
  } else if (value.match(/Ki$/)) {
    return numericValue / 1024;
  } else if (value.match(/Ti$/)) {
    return numericValue * 1048576;
  } else {
    return numericValue;
  }
};

export const parseResourceQuota = (
  items: ResourceQuotaKubeObjectInterface[],
  useAnnotations: boolean
): {
  quotas: ParsedQuotas;
  highestUsedQuota: QuotaDetails | null;
} => {
  const quotas = items.reduce<ParsedQuotas>((acc, item) => {
    if (useAnnotations) {
      const annotations = item.metadata.annotations || {};
      Object.keys(annotations).forEach((key) => {
        const [category, entity] = key.substring(key.lastIndexOf('/') + 1).split('-');
        const value = convertToNumber(annotations[key]);

        if (!acc[entity]) acc[entity] = {};
        acc[entity][category] = value;
        acc[entity][`${category}_initial`] = annotations[key];
      });
    } else {
      const status = item.status || {};
      ['hard', 'used'].forEach((statusType) => {
        const statusData = status[statusType] || {};
        Object.keys(statusData).forEach((key) => {
          const entity = key;
          const value = convertToNumber(statusData[key]);

          if (!acc[entity]) acc[entity] = {};
          acc[entity][statusType] = value;
          acc[entity][`${statusType}_initial`] = statusData[key]; // Ensure initial value is captured similarly
        });
      });
    }

    return acc;
  }, {});

  const highestUsedQuota = Object.entries(quotas).reduce<QuotaDetails | null>(
    (acc, [entity, details]) => {
      const used = details.used || 0;
      const hard = details.hard || 0;
      const usedPercentage = (used / hard) * 100;

      if (!acc || usedPercentage > acc.usedPercentage) {
        return {
          entity,
          used,
          hard,
          usedPercentage,
        };
      }

      return acc;
    },
    null
  );

  return { quotas, highestUsedQuota };
};

export const getColorByLoadPercentage = (theme: Theme, loadPercentage: number) => {
  if (loadPercentage < 70) {
    return theme.palette.primary.main;
  }

  if (loadPercentage < 90) {
    return theme.palette.warning.dark;
  }

  return theme.palette.error.main;
};
