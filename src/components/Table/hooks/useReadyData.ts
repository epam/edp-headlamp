import React from 'react';
import { ValueOf } from '../../../types/global';
import { SORT_ORDERS } from '../constants';

export interface UseDataProps<DataType> {
  data: DataType[];
  sort: {
    order: ValueOf<typeof SORT_ORDERS>;
    sortFn: (a: DataType, b: DataType) => number;
  };
  filterFunction: (el: DataType) => boolean;
  isLoading: boolean;
  error: unknown;
}

export const useReadyData = <DataType>({
  data,
  filterFunction,
  sort,
  isLoading,
  error,
}: UseDataProps<DataType>) => {
  return React.useMemo(() => {
    if (!data || isLoading || error) {
      return null;
    }

    let result = [...data];

    if (filterFunction) {
      result = result.filter(filterFunction);
    }

    if (sort.sortFn) {
      result = result.sort(sort.sortFn);
    }

    return result;
  }, [data, isLoading, error, filterFunction, sort.sortFn]);
};
