import React from 'react';
import { SortState, TableColumn } from '../../../../types';

export interface TableRowProps<DataType = unknown> {
  tableId: string;
  columns: readonly TableColumn<DataType>[];
  colGroupRef: React.MutableRefObject<HTMLTableColElement>;
  rowCount: number;
  sort: SortState<DataType>;
  setSort: React.Dispatch<React.SetStateAction<SortState<DataType>>>;
  selectableRowCount?: number;
  selected?: string[];
  handleSelectAllClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
