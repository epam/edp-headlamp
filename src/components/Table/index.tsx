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
  filterFunction,
  showPagination = true,
  reflectInURL = false,
  initialPage = 0,
  rowsPerPage = 15,
  selected,
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

  const rowCount = readyData?.length || 0;
  const hasEmptyResult = React.useMemo(() => {
    if (!data || !readyData) {
      return;
    }

    return !!data.length && !readyData?.length;
  }, [data, readyData]);

  return (
    <Paper variant={'outlined'} style={{ maxWidth: '100%', overflowX: 'auto' }}>
      <MuiTable style={{ borderRadius: rem(5), overflow: 'hidden' }}>
        <colgroup>
          {handleSelectRowClick && <col key={'select-checkbox'} width={'4%'} />}
          {columns.map(
            column =>
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
          selected={selected}
          handleSelectAllClick={handleSelectAllClick}
        />
        <TableBody
          columns={columns}
          readyData={readyData}
          error={error}
          isLoading={isLoading}
          handleRowClick={handleRowClick}
          handleSelectRowClick={handleSelectRowClick}
          isSelected={isSelected}
          emptyListComponent={emptyListComponent}
          page={page}
          rowsPerPage={_rowsPerPage}
          hasEmptyResult={hasEmptyResult}
        />
      </MuiTable>
      {showPagination && data?.length > _rowsPerPage && (
        <TablePagination
          dataCount={readyData && readyData.length}
          page={page}
          rowsPerPage={_rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
};
