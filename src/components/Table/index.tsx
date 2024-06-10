import { Paper, Table as MuiTable } from '@mui/material';
import React from 'react';
import { usePagination } from '../../hooks/usePagination';
import { ValueOf } from '../../types/global';
import { rem } from '../../utils/styling/rem';
import { TableBody } from './components/TableBody';
import { TableHead } from './components/TableHead';
import { TablePagination } from './components/TablePagination';
import { SORT_ORDERS } from './constants';
import { useReadyData } from './hooks/useReadyData';
import { TableProps } from './types';

export const Table = <DataType extends unknown>({
  data,
  columns,
  upperColumns,
  isLoading = false,
  error,
  defaultSortBy = 'name',
  defaultSortOrder = SORT_ORDERS.DESC,
  emptyListComponent,
  handleRowClick,
  handleSelectRowClick,
  handleSelectAllClick,
  isSelected,
  canBeSelected,
  filterFunction,
  showPagination = true,
  reflectInURL = false,
  initialPage = 0,
  rowsPerPage = 15,
  selected,
  blockerComponent,
}: TableProps<DataType>) => {
  const prefix = reflectInURL === true ? '' : reflectInURL || '';

  const {
    page,
    rowsPerPage: _rowsPerPage,
    handleChangeRowsPerPage,
    handleChangePage,
  } = usePagination({
    reflectInURL: reflectInURL,
    prefix,
    initialPage,
    rowsPerPage,
  });

  const [columnSortableValuePath, setColumnSortableValuePath] = React.useState<string | string[]>(
    defaultSortBy
  );
  const [sortOrder, setSortOrder] = React.useState<ValueOf<typeof SORT_ORDERS>>(defaultSortOrder);

  const readyData = useReadyData({
    data,
    isLoading,
    error,
    filterFunction,
    sortOrder,
    columnSortableValuePath,
  });

  const isReadyDataLoading = readyData === null;

  const hasEmptyResult = React.useMemo(() => {
    if (isLoading && isReadyDataLoading) {
      return false;
    }

    return !!data?.length && !readyData?.length;
  }, [data, isLoading, isReadyDataLoading, readyData]);

  const activePage = readyData !== null && readyData.length < _rowsPerPage ? 0 : page;

  const paginatedItems = React.useMemo(() => {
    if (!readyData) {
      return [];
    }

    return readyData.slice(page * _rowsPerPage, page * _rowsPerPage + _rowsPerPage);
  }, [page, readyData, _rowsPerPage]);

  const selectableRowCount = canBeSelected ? paginatedItems.filter(canBeSelected).length : 0;

  const rowCount = paginatedItems.length;

  const _handleSelectAllClick = React.useMemo(
    () =>
      handleSelectAllClick && readyData?.length
        ? (event: React.ChangeEvent<HTMLInputElement>) =>
            handleSelectAllClick(event, paginatedItems)
        : null,
    [handleSelectAllClick, paginatedItems, readyData?.length]
  );

  return (
    <Paper
      variant={'outlined'}
      style={{
        maxWidth: '100%',
        overflowX: 'auto',
        backgroundColor: 'transparent',
        border: 'none',
      }}
    >
      <MuiTable style={{ borderRadius: rem(5), overflow: 'hidden' }}>
        <colgroup>
          {handleSelectRowClick && <col key={'select-checkbox'} width={'64px'} />}
          {columns.map(
            (column) =>
              column.show !== false && <col key={column.id} width={column.width || '100%'} />
          )}
        </colgroup>
        <TableHead
          setColumnSortableValuePath={setColumnSortableValuePath}
          columns={columns}
          upperColumns={upperColumns}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          defaultSortBy={defaultSortBy}
          rowCount={rowCount}
          selectableRowCount={selectableRowCount}
          selected={selected}
          handleSelectAllClick={_handleSelectAllClick}
        />
        <TableBody
          columns={columns}
          readyData={readyData}
          error={error}
          isLoading={isLoading}
          handleRowClick={handleRowClick}
          handleSelectRowClick={handleSelectRowClick}
          isSelected={isSelected}
          canBeSelected={canBeSelected}
          emptyListComponent={emptyListComponent}
          page={activePage}
          rowsPerPage={_rowsPerPage}
          hasEmptyResult={hasEmptyResult}
          blockerComponent={blockerComponent}
        />
      </MuiTable>
      {showPagination && (
        <TablePagination
          dataCount={readyData && readyData.length}
          page={activePage}
          rowsPerPage={_rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
};
