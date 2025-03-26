import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';
import { TableCellProps } from '@mui/material';
import React from 'react';
import { ValueOf } from '../../types/global';
import { SORT_ORDERS } from './constants';

export interface TableColumn<DataType> {
  id: any;
  label: string | React.ReactElement;
  data: {
    render: ({
      data,
      meta,
    }: {
      data: DataType;
      meta?: {
        selectionLength: number;
      };
    }) => React.ReactElement | string | number | undefined | null;
    columnSortableValuePath?: string | string[];
    customSortFn?: (a: DataType, b: DataType) => number;
  };
  cell: {
    baseWidth: number;
    width?: number;
    show?: boolean;
    isFixed?: boolean;
    colSpan?: number;
    props?: TableCellProps;
    customizable?: boolean; // width
  };
}

export interface SortState<DataType> {
  order: ValueOf<typeof SORT_ORDERS>;
  sortFn: (a: DataType, b: DataType) => number;
  sortBy: string;
}

export interface TableSort {
  order: ValueOf<typeof SORT_ORDERS>;
  sortBy: string;
}

export interface TableSelection<DataType> {
  selected?: string[];
  isRowSelectable?: (row: DataType) => boolean;
  isRowSelected?: (row: DataType) => boolean;
  handleSelectAll?: (
    event: React.ChangeEvent<HTMLInputElement>,
    paginatedItems: DataType[]
  ) => void;
  handleSelectRow?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, row: DataType) => void;
  renderSelectionInfo?: (selectedCount: number) => React.ReactElement;
}

export interface TablePagination {
  show: boolean;
  rowsPerPage: number;
  initialPage: number;
  reflectInURL: boolean;
}

export interface TableSettings {
  show: boolean;
}
export interface TableProps<DataType = unknown> {
  id: string;
  data: DataType[];
  columns: TableColumn<DataType>[];
  isLoading?: boolean;
  name?: string;
  sort?: TableSort;
  selection?: TableSelection<DataType>;
  pagination?: TablePagination;
  settings?: TableSettings;
  blockerComponent?: React.ReactNode;
  emptyListComponent?: React.ReactNode;
  blockerError?: ApiError;
  errors?: ApiError[] | null;
  filterFunction?: (el: DataType) => boolean;
  handleRowClick?: (event: React.MouseEvent<HTMLTableRowElement>, row: DataType) => void;
  slots?: {
    header?: React.ReactElement;
    footer?: React.ReactElement;
  };
}
