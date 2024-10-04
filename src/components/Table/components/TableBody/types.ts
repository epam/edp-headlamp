import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';
import React from 'react';
import { TableColumn } from '../../types';

export interface TableBodyProps<DataType = unknown> {
  isLoading: boolean;
  blockerError?: ApiError;
  errors?: ApiError[] | null;
  readyData: DataType[];
  columns: readonly TableColumn<DataType>[];
  blockerComponent?: React.ReactNode;
  emptyListComponent?: React.ReactNode;
  handleRowClick?: (event: React.MouseEvent<HTMLTableRowElement>, row: DataType) => void;
  handleSelectRowClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    row: DataType
  ) => void;
  isSelected?: (row: DataType) => boolean;
  canBeSelected?: (row: DataType) => boolean;
  hasEmptyResult: boolean;
  page: number;
  rowsPerPage: number;
}
