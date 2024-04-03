import { get } from 'lodash';
import React from 'react';
import { ValueOf } from '../../../types/global';
import { SORT_ORDERS } from '../constants';

export interface UseDataProps {
  data: any[];
  filterFunction: (el: any) => boolean;
  sortOrder: ValueOf<typeof SORT_ORDERS>;
  columnSortableValuePath?: string | string[];
  isLoading: boolean;
  error: unknown;
}

const createSortFunction =
  (sortOrder: ValueOf<typeof SORT_ORDERS>, columnSortableValuePath: string | string[]) =>
  (a, b) => {
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

export const useReadyData = ({
  data,
  filterFunction,
  columnSortableValuePath,
  sortOrder,
  isLoading,
  error,
}: UseDataProps) => {
  return React.useMemo(() => {
    if (!data || isLoading || error) {
      return null;
    }

    let result = [...data];

    if (filterFunction) {
      result = result.filter(filterFunction);
    }

    if (columnSortableValuePath) {
      result = result.sort(createSortFunction(sortOrder, columnSortableValuePath));
    }

    return result;
  }, [columnSortableValuePath, data, error, isLoading, filterFunction, sortOrder]);
};
