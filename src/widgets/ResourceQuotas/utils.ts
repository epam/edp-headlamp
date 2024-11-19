import { Theme } from '@mui/material';
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
  annotations: Record<string, string>
): {
  quotas: ParsedQuotas;
  highestUsedQuota: QuotaDetails | null;
} => {
  const quotas: ParsedQuotas = {};
  let highestUsedQuota: QuotaDetails | null = null;

  Object.keys(annotations).forEach((key) => {
    const initialVal = annotations[key];
    const value = convertToNumber(initialVal);
    const subKey = key.substring(key.lastIndexOf('/') + 1);
    const [category, entity] = subKey.split('-');

    if (!quotas[entity]) {
      quotas[entity] = {};
    }

    quotas[entity][category] = value;
    quotas[entity][`${category}_initial`] = initialVal;

    if (quotas[entity].hard && quotas[entity].used && quotas[entity].hard > 0) {
      const usedPercentage = (quotas[entity].used / quotas[entity].hard) * 100;
      quotas[entity].usedPercentage = usedPercentage;

      if (highestUsedQuota === null || usedPercentage > highestUsedQuota.usedPercentage) {
        highestUsedQuota = { ...quotas[entity] };
      }
    }
  });

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
