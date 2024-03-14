import React from 'react';
import { ValueOf } from '../../../../../../types/global';
import { SORT_ORDERS } from '../../../../constants';
import { TableColumn } from '../../../../types';

export interface TableRowProps<DataType = unknown> {
  columns: readonly TableColumn<DataType>[];
  defaultSortBy: string;
  rowCount: number;
  sortOrder: ValueOf<typeof SORT_ORDERS>;
  setSortOrder: React.Dispatch<React.SetStateAction<ValueOf<typeof SORT_ORDERS>>>;
  setColumnSortableValuePath: React.Dispatch<React.SetStateAction<string | string[]>>;
  selectableRowCount?: number;
  selected?: string[];
  handleSelectAllClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
