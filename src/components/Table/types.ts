import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';
import { TableCellProps } from '@mui/material';
import React from 'react';
import { ValueOf } from '../../types/global';
import { SORT_ORDERS } from './constants';

export interface SortState<DataType> {
  order: ValueOf<typeof SORT_ORDERS>;
  sortFn: (a: DataType, b: DataType) => number;
  sortBy: string;
}

export interface TableProps<DataType = unknown> {
  isLoading: boolean;
  data: DataType[];
  columns: readonly TableColumn<DataType>[];
  blockerComponent?: React.ReactNode;
  upperColumns?: readonly TableColumn<DataType>[];
  defaultSortBy?: string;
  defaultSortOrder?: ValueOf<typeof SORT_ORDERS>;
  emptyListComponent?: React.ReactNode;
  handleRowClick?: (event: React.MouseEvent<HTMLTableRowElement>, row: DataType) => void;
  handleSelectRowClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    row: DataType
  ) => void;
  blockerError?: ApiError;
  errors?: ApiError[] | null;
  handleSelectAllClick?: (
    event: React.ChangeEvent<HTMLInputElement>,
    paginatedItems: DataType[]
  ) => void;
  selected?: string[];
  canBeSelected?: (row: DataType) => boolean;
  isSelected?: (row: DataType) => boolean;
  filterFunction?: ((...args: DataType[]) => boolean) | null;
  showPagination?: boolean;
  reflectInURL?: boolean;
  initialPage?: number;
  rowsPerPage?: number;
}

export interface TableColumn<DataType> {
  id: any;
  label: string | React.ReactElement;
  render: (data?: DataType) => React.ReactElement | string | number;
  columnSortableValuePath?: string | string[];
  customSortFn?: (a: DataType, b: DataType) => number;
  show?: boolean;
  customizable?: boolean;
  textAlign?: TableCellProps['align'];
  width?: string;
  colSpan?: number;
}
