import {
  CircularProgress,
  TableBody as MuiTableBody,
  TableCell,
  TableRow as MuiTableRow,
  Typography,
} from '@mui/material';
import React from 'react';
import { EmptyList } from '../../../EmptyList';
import { TableRow } from './components/TableRow';
import { TableBodyProps } from './types';

const isSelectedRow = (isSelected: (row: unknown) => boolean, row: unknown) =>
  isSelected ? isSelected(row) : false;

export const TableBody = ({
  error,
  isLoading,
  columns,
  readyData,
  handleRowClick,
  handleSelectRowClick,
  isSelected,
  canBeSelected,
  emptyListComponent,
  page,
  rowsPerPage,
  hasEmptyResult,
}: TableBodyProps) => {
  const renderTableBody = React.useCallback(() => {
    if (error) {
      return (
        <MuiTableRow>
          <TableCell colSpan={columns.length} align={'center'}>
            <Typography color={'error'} variant={'h6'}>
              {error.toString()}
            </Typography>
          </TableCell>
        </MuiTableRow>
      );
    }

    if (isLoading) {
      return (
        <MuiTableRow>
          <TableCell colSpan={columns.length} align={'center'}>
            <CircularProgress />
          </TableCell>
        </MuiTableRow>
      );
    }

    if (readyData !== null) {
      return readyData
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, idx: number) => {
          const _isSelected = isSelectedRow(isSelected, row);
          const _canBeSelected = canBeSelected ? canBeSelected(row) : true;

          return (
            <TableRow
              key={`table-row-${idx}`}
              item={row}
              columns={columns}
              isSelected={_isSelected}
              canBeSelected={_canBeSelected}
              handleRowClick={handleRowClick}
              handleSelectRowClick={handleSelectRowClick}
            />
          );
        });
    }

    if (hasEmptyResult) {
      return (
        <MuiTableRow>
          <TableCell colSpan={columns.length} align={'center'}>
            <EmptyList customText={'No results found!'} isSearch />
          </TableCell>
        </MuiTableRow>
      );
    }

    console.log('showing empty list');

    return (
      <MuiTableRow>
        <TableCell colSpan={columns.length} align={'center'}>
          <>{emptyListComponent}</>
        </TableCell>
      </MuiTableRow>
    );
  }, [
    canBeSelected,
    columns,
    emptyListComponent,
    error,
    handleRowClick,
    handleSelectRowClick,
    hasEmptyResult,
    isLoading,
    isSelected,
    page,
    readyData,
    rowsPerPage,
  ]);

  return <MuiTableBody>{renderTableBody()}</MuiTableBody>;
};
