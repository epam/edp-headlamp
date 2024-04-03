import React from 'react';
import { TableColumn } from '../../types';

export interface TableBodyProps<DataType = unknown> {
  isLoading: boolean;
  error?: unknown;
  readyData: DataType[];
  columns: readonly TableColumn<DataType>[];
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
