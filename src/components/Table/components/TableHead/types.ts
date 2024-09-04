import React from 'react';
import { SortState, TableColumn } from '../../types';

export interface TableHeadProps<DataType = unknown> {
  columns: readonly TableColumn<DataType>[];
  rowCount: number;
  sort: SortState<DataType>;
  setSort: React.Dispatch<React.SetStateAction<SortState<DataType>>>;
  selectableRowCount?: number;
  upperColumns?: readonly TableColumn<DataType>[];
  selected?: string[];
  handleSelectAllClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
