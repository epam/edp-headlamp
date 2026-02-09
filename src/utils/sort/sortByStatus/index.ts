import { CUSTOM_RESOURCE_STATUS_SORT_ORDER } from '../../../constants/statuses';

export const sortByStatus = (a: string, b: string): number => {
  if (CUSTOM_RESOURCE_STATUS_SORT_ORDER[a] < CUSTOM_RESOURCE_STATUS_SORT_ORDER[b]) {
    return -1;
  } else if (CUSTOM_RESOURCE_STATUS_SORT_ORDER[a] > CUSTOM_RESOURCE_STATUS_SORT_ORDER[b]) {
    return 1;
  }
  return 0;
};
