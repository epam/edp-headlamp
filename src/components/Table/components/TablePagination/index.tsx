import { TablePagination as MuiTablePagination } from '@mui/material';
import React from 'react';
import { TablePaginationProps } from './types';

export const TablePagination = ({
  dataCount,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
}: TablePaginationProps) => {
  return (
    <MuiTablePagination
      rowsPerPageOptions={
        JSON.parse(localStorage.getItem('settings') || '{}')?.tableRowsPerPageOptions || [
          5, 15, 25, 50,
        ]
      }
      component="div"
      count={dataCount || 0}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};
