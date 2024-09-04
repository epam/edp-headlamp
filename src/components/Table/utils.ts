import { get } from 'lodash';
import { ValueOf } from '../../types/global';
import { SORT_ORDERS } from './constants';

export const createSortFunction =
  (sortOrder: ValueOf<typeof SORT_ORDERS>, columnSortableValuePath: string | string[]) =>
  (a: unknown, b: unknown) => {
    const aProperty = get(a, columnSortableValuePath)?.toString().toLowerCase() || '';
    const bProperty = get(b, columnSortableValuePath)?.toString().toLowerCase() || '';

    if (sortOrder === SORT_ORDERS.DESC) {
      return aProperty < bProperty ? -1 : 1;
    } else if (sortOrder === SORT_ORDERS.ASC) {
      return aProperty > bProperty ? -1 : 1;
    } else {
      return 0;
    }
  };

export const createCustomSortFunction = (
  sortOrder: ValueOf<typeof SORT_ORDERS>,
  customSortFn: (a: unknown, b: unknown) => number
) => {
  return (a: unknown, b: unknown) => {
    if (sortOrder === SORT_ORDERS.DESC) {
      return customSortFn(a, b);
    } else if (sortOrder === SORT_ORDERS.ASC) {
      return customSortFn(b, a);
    } else {
      return 0;
    }
  };
};

export const isDesc = (columnId: string, sortBy: string, sortOrder: ValueOf<typeof SORT_ORDERS>) =>
  sortBy === columnId && sortOrder === SORT_ORDERS.DESC;
export const isAsc = (columnId: string, sortBy: string, sortOrder: ValueOf<typeof SORT_ORDERS>) =>
  sortBy === columnId && sortOrder === SORT_ORDERS.ASC;

export const getSortOrder = (isDesc: boolean, isAsc: boolean) =>
  isDesc ? SORT_ORDERS.ASC : isAsc ? SORT_ORDERS.UNSET : SORT_ORDERS.DESC;

export const getFlexPropertyByTextAlign = (textAlign: string) => {
  switch (textAlign) {
    case 'center':
      return 'center';
    case 'right':
      return 'flex-end';
    default:
      return 'flex-start';
  }
};
