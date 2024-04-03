import { GridSpacing } from '@mui/material/Grid/Grid';
import React from 'react';

export interface DataGridProps<DataType = unknown> {
  isLoading: boolean;
  spacing: GridSpacing;
  renderItem: (item: DataType) => React.ReactElement;
  data: DataType[];
  error?: unknown;
  filterFunction?: ((...args: DataType[]) => boolean) | null;
  showPagination?: boolean;
  reflectInURL?: boolean;
  initialPage?: number;
  rowsPerPage?: number;
  emptyListComponent?: React.ReactNode;
}
