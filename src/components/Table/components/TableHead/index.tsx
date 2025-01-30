import { TableHead as MuiTableHead } from '@mui/material';
import React from 'react';
import { TableRow } from './components/TableRow';
import { TableHeadProps } from './types';

export const TableHead = ({
  columns,
  sort,
  setSort,
  rowCount,
  selectableRowCount,
  selected,
  handleSelectAllClick,
}: TableHeadProps) => {
  return (
    <MuiTableHead>
      <TableRow
        columns={columns}
        rowCount={rowCount}
        selectableRowCount={selectableRowCount}
        sort={sort}
        setSort={setSort}
        selected={selected}
        handleSelectAllClick={handleSelectAllClick}
      />
    </MuiTableHead>
  );
};
