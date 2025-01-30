import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';
import React from 'react';
import { TableColumn, TableSelection } from '../../types';

export interface TableBodyProps<DataType = unknown> {
  data: DataType[];
  columns: readonly TableColumn<DataType>[];
  isLoading: boolean;
  blockerError?: ApiError;
  errors?: ApiError[] | null;
  blockerComponent?: React.ReactNode;
  emptyListComponent?: React.ReactNode;
  handleRowClick?: (event: React.MouseEvent<HTMLTableRowElement>, row: DataType) => void;
  selection?: TableSelection<DataType>;
  isEmptyFilterResult: boolean;
  page: number;
  rowsPerPage: number;
}
