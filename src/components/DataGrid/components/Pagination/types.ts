import React from 'react';

export interface PaginationProps {
  dataCount: number | null;
  rowsPerPage: number;
  page: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
