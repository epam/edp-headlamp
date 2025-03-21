import { TableHead as MuiTableHead } from '@mui/material';
import React from 'react';
import { TableRow } from './components/TableRow';
import { TableHeadProps } from './types';

export const TableHead = <DataType extends unknown>({
  tableId,
  columns,
  colGroupRef,
  sort,
  setSort,
  rowCount,
  selectableRowCount,
  selected,
  handleSelectAllClick,
}: TableHeadProps<DataType>) => {
  return (
    <MuiTableHead>
      <TableRow
        tableId={tableId}
        columns={columns}
        colGroupRef={colGroupRef}
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
