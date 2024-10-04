import {
  Alert,
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
  blockerError,
  errors,
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
    const hasSelection = !!handleSelectRowClick;
    const _columnsLength = columns.length;
    const columnsLength = hasSelection ? _columnsLength + 1 : _columnsLength;

    if (blockerError) {
      return (
        <MuiTableRow>
          <TableCell colSpan={columnsLength} align={'center'}>
            <ErrorContent error={blockerError} />
          </TableCell>
        </MuiTableRow>
      );
    }

    if (blockerComponent) {
      return (
        <MuiTableRow>
          <TableCell colSpan={columnsLength} align={'center'}>
            {blockerComponent}
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

    if (readyData !== null && readyData?.length) {
      return (
        <>
          {errors && !!errors.length && (
            <MuiTableRow>
              <TableCell colSpan={columns.length} align={'center'}>
                <Alert severity="warning">
                  {errors.map((error) => (
                    <div>{error?.message || error?.toString()}</div>
                  ))}
                </Alert>
              </TableCell>
            </MuiTableRow>
          )}
          {readyData
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
            })}
        </>
      );
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
    handleSelectRowClick,
    columns,
    blockerError,
    blockerComponent,
    isLoading,
    readyData,
    hasEmptyResult,
    emptyListComponent,
    page,
    rowsPerPage,
    errors,
    isSelected,
    canBeSelected,
    handleRowClick,
  ]);

  return <MuiTableBody>{renderTableBody()}</MuiTableBody>;
};
