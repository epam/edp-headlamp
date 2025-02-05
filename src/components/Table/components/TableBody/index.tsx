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
  data,
  handleRowClick,
  selection,
  emptyListComponent,
  page,
  rowsPerPage,
  isEmptyFilterResult,
  blockerComponent,
}: TableBodyProps) => {
  const renderTableBody = React.useCallback(() => {
    const columnsLength = columns.length;

    if (blockerError) {
      return (
        <MuiTableRow>
          <TableCell
            colSpan={columnsLength}
            align={'center'}
            sx={{ px: 0, pb: 0, borderBottom: 0 }}
          >
            <ErrorContent error={blockerError} />
          </TableCell>
        </MuiTableRow>
      );
    }

    if (blockerComponent) {
      return (
        <MuiTableRow>
          <TableCell
            colSpan={columnsLength}
            align={'center'}
            sx={{ px: 0, pb: 0, borderBottom: 0 }}
          >
            {blockerComponent}
          </TableCell>
        </MuiTableRow>
      );
    }

    if (isLoading) {
      return (
        <MuiTableRow>
          <TableCell
            colSpan={columnsLength}
            align={'center'}
            sx={{ px: 0, pb: 0, borderBottom: 0 }}
          >
            <CircularProgress />
          </TableCell>
        </MuiTableRow>
      );
    }

    if (data !== null && data?.length) {
      return (
        <>
          {errors && !!errors.length && (
            <MuiTableRow>
              <TableCell
                colSpan={columnsLength}
                align={'center'}
                sx={{ px: 0, pb: 0, borderBottom: 0 }}
              >
                <Alert severity="warning">
                  {errors.map((error) => (
                    <div>{error?.message || error?.toString()}</div>
                  ))}
                </Alert>
              </TableCell>
            </MuiTableRow>
          )}
          {data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, idx: number) => {
              const _isSelected = isSelectedRow(selection?.isRowSelected, row);
              const _isSelectable = selection?.isRowSelectable
                ? selection?.isRowSelectable(row)
                : true;

              return (
                <TableRow
                  key={`table-row-${idx}`}
                  item={row}
                  columns={columns}
                  isRowSelected={_isSelected}
                  isRowSelectable={_isSelectable}
                  handleRowClick={handleRowClick}
                  handleSelectRowClick={selection?.handleSelectRow}
                />
              );
            })}
        </>
      );
    }

    if (isEmptyFilterResult) {
      return (
        <MuiTableRow>
          <TableCell
            colSpan={columnsLength}
            align={'center'}
            sx={{ px: 0, pb: 0, borderBottom: 0 }}
          >
            <EmptyList customText={'No results found!'} isSearch />
          </TableCell>
        </MuiTableRow>
      );
    }

    return (
      <MuiTableRow>
        <TableCell colSpan={columnsLength} align={'center'} sx={{ px: 0, pb: 0, borderBottom: 0 }}>
          <>{emptyListComponent}</>
        </TableCell>
      </MuiTableRow>
    );
  }, [
    selection,
    columns,
    blockerError,
    blockerComponent,
    isLoading,
    data,
    isEmptyFilterResult,
    emptyListComponent,
    errors,
    page,
    rowsPerPage,
    handleRowClick,
  ]);

  return <MuiTableBody>{renderTableBody()}</MuiTableBody>;
};
