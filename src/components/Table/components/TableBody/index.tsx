import {
  CircularProgress,
  TableBody as MuiTableBody,
  TableCell,
  TableRow as MuiTableRow,
} from '@mui/material';
import React from 'react';
import { EmptyList } from '../../../EmptyList';
import { ErrorContent } from '../../../ErrorContent';
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
  blockerComponent,
}: TableBodyProps) => {
  const renderTableBody = React.useCallback(() => {
    if (error) {
      const hasSelection = !!handleSelectRowClick;
      const columnsLength = columns.length;

      return (
        <MuiTableRow>
          <TableCell colSpan={hasSelection ? columnsLength + 1 : columnsLength} align={'center'}>
            <ErrorContent error={error} />
          </TableCell>
        </MuiTableRow>
      );
    }

    if (blockerComponent) {
      return <MuiTableRow>{blockerComponent}</MuiTableRow>;
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

    if (readyData !== null && readyData?.length) {
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

    return (
      <MuiTableRow>
        <TableCell colSpan={columns.length} align={'center'}>
          <>{emptyListComponent}</>
        </TableCell>
      </MuiTableRow>
    );
  }, [
    blockerComponent,
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
