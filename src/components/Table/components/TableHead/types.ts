import React from 'react';
import { SortState, TableColumn } from '../../types';

export interface TableHeadProps<DataType = unknown> {
  columns: TableColumn<DataType>[];
  rowCount: number;
  sort: SortState<DataType>;
  setSort: React.Dispatch<React.SetStateAction<SortState<DataType>>>;
  selectableRowCount?: number;
  selected?: string[];
  handleSelectAllClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
