import { Box, Paper, Stack, Table as MuiTable } from '@mui/material';
import React from 'react';
import { usePagination } from '../../hooks/usePagination';
import { rem } from '../../utils/styling/rem';
import { TableBody } from './components/TableBody';
import { TableHead } from './components/TableHead';
import { TablePagination } from './components/TablePagination';
import { TableSettings } from './components/TableSettings';
import {
  PAGINATION_DEFAULTS,
  SELECTION_DEFAULTS,
  SORT_DEFAULTS,
  TABLE_CELL_DEFAULTS,
  TABLE_SETTINGS_DEFAULTS,
} from './constants';
import { useFilteredData } from './hooks/useFilteredData';
import {
  SortState,
  TablePagination as TablePaginationType,
  TableProps,
  TableSelection,
  TableSettings as TableSettingsType,
  TableSort,
} from './types';
import { createSortFunction } from './utils';

export const Table = <DataType extends unknown>({
  id,
  name,
  data,
  columns: _columns,
  isLoading = false,
  blockerError,
  errors,
  sort,
  selection,
  pagination,
  emptyListComponent,
  filterFunction,
  handleRowClick,
  blockerComponent,
  slots,
  settings,
}: TableProps<DataType>) => {
  const [columns, setColumns] = React.useState(_columns);
  const paginationSettings: TablePaginationType = React.useMemo(
    () => ({
      show: pagination?.show ?? PAGINATION_DEFAULTS.SHOW,
      rowsPerPage: pagination?.rowsPerPage ?? PAGINATION_DEFAULTS.ROWS_PER_PAGE,
      initialPage: pagination?.initialPage ?? PAGINATION_DEFAULTS.INITIAL_PAGE,
      reflectInURL: pagination?.reflectInURL ?? PAGINATION_DEFAULTS.REFLECT_IN_URL,
    }),
    [pagination?.initialPage, pagination?.reflectInURL, pagination?.rowsPerPage, pagination?.show]
  );

  const sortSettings: TableSort = React.useMemo(
    () => ({
      order: sort?.order ?? SORT_DEFAULTS.ORDER,
      sortBy: sort?.sortBy ?? SORT_DEFAULTS.SORT_BY,
    }),
    [sort?.order, sort?.sortBy]
  );

  const selectionSettings: TableSelection<DataType> = React.useMemo(
    () => ({
      selected: selection?.selected ?? [],
      isRowSelectable: selection?.isRowSelectable ?? SELECTION_DEFAULTS.IS_ROW_SELECTABLE,
      isRowSelected: selection?.isRowSelected,
      handleSelectAll: selection?.handleSelectAll,
      handleSelectRow: selection?.handleSelectRow,
      renderSelectionInfo: selection?.renderSelectionInfo,
    }),
    [
      selection?.handleSelectAll,
      selection?.handleSelectRow,
      selection?.isRowSelectable,
      selection?.isRowSelected,
      selection?.renderSelectionInfo,
      selection?.selected,
    ]
  );

  const tableSettings: TableSettingsType = React.useMemo(
    () => ({
      show: settings?.show ?? TABLE_SETTINGS_DEFAULTS.SHOW,
    }),
    [settings?.show]
  );

  const {
    page,
    rowsPerPage: _rowsPerPage,
    handleChangeRowsPerPage,
    handleChangePage,
  } = usePagination({
    reflectInURL: paginationSettings.reflectInURL,
    initialPage: paginationSettings.initialPage,
    rowsPerPage: paginationSettings.rowsPerPage,
  });

  const [sortState, setSortState] = React.useState<SortState<DataType>>({
    order: sortSettings.order,
    sortFn: createSortFunction(sortSettings.order, sortSettings.sortBy),
    sortBy: sortSettings.sortBy,
  });

  const filteredData = useFilteredData<DataType>({
    data,
    isLoading,
    error: blockerError,
    filterFunction,
    sort: sortState,
  });

  const isFilteredDataLoading = filteredData === null;

  const isEmptyFilterResult = React.useMemo(() => {
    if (isLoading && isFilteredDataLoading) {
      return false;
    }

    return !!data?.length && !filteredData?.length;
  }, [data, isLoading, isFilteredDataLoading, filteredData]);

  const activePage = filteredData !== null && filteredData.length < _rowsPerPage ? 0 : page;

  const paginatedData = React.useMemo(() => {
    if (!filteredData) {
      return {
        items: [],
        count: 0,
      };
    }

    const items = filteredData.slice(page * _rowsPerPage, page * _rowsPerPage + _rowsPerPage);

    return {
      items,
      count: items?.length,
    };
  }, [page, filteredData, _rowsPerPage]);

  const selectableRowCount = React.useMemo(
    () => paginatedData.items.filter(selectionSettings.isRowSelectable).length,
    [paginatedData.items, selectionSettings.isRowSelectable]
  );

  const _handleSelectAllClick = React.useMemo(
    () =>
      selectionSettings.handleSelectAll && filteredData?.length
        ? (event: React.ChangeEvent<HTMLInputElement>) =>
            selectionSettings.handleSelectAll(event, paginatedData.items)
        : null,
    [paginatedData.items, filteredData?.length, selectionSettings]
  );

  return (
    <Paper
      variant={'outlined'}
      sx={{
        maxWidth: '100%',
        overflowX: 'auto',
        backgroundColor: 'transparent',
        px: (t) => t.typography.pxToRem(20),
        pt: (t) => t.typography.pxToRem(20),
      }}
    >
      <Stack spacing={2}>
        <Stack spacing={2}>
          {slots?.header || tableSettings.show ? (
            <Stack direction="row" spacing={2} alignItems="center">
              <Box flexGrow={1}>{slots?.header && slots.header}</Box>
              <Box sx={{ pl: (t) => t.typography.pxToRem(20) }}>
                {columns && tableSettings.show && (
                  <TableSettings
                    id={id}
                    name={name}
                    originalColumns={_columns}
                    columns={columns}
                    setColumns={setColumns}
                    hasSelection={!!selectionSettings.handleSelectRow}
                  />
                )}
              </Box>
            </Stack>
          ) : null}
          {selectionSettings.renderSelectionInfo && (
            <Box sx={{ pl: (t) => t.typography.pxToRem(11) }}>
              {selectionSettings.renderSelectionInfo(selectionSettings.selected.length)}
            </Box>
          )}
        </Stack>

        <MuiTable style={{ borderRadius: rem(5), overflow: 'hidden' }}>
          <colgroup>
            {selectableRowCount > 0 && selectionSettings.handleSelectRow && (
              <col key={'select-checkbox'} width={`${TABLE_CELL_DEFAULTS.WIDTH}%`} />
            )}
            {columns.map(
              (column) =>
                column.cell.show !== false && (
                  <col key={column.id} width={`${column.cell.width}%` || '100%'} />
                )
            )}
          </colgroup>
          <TableHead
            columns={columns}
            sort={sortState}
            setSort={setSortState}
            rowCount={paginatedData?.count}
            selectableRowCount={selectableRowCount}
            selected={selectionSettings.selected}
            handleSelectAllClick={_handleSelectAllClick}
          />
          <TableBody
            columns={columns}
            data={filteredData}
            blockerError={blockerError}
            errors={errors}
            isLoading={isLoading}
            selection={selectionSettings}
            handleRowClick={handleRowClick}
            emptyListComponent={emptyListComponent}
            page={activePage}
            rowsPerPage={_rowsPerPage}
            isEmptyFilterResult={isEmptyFilterResult}
            blockerComponent={blockerComponent}
          />
        </MuiTable>
        <Box sx={{ m: '0 !important' }}>
          {paginationSettings.show && (
            <TablePagination
              dataCount={filteredData && filteredData.length}
              page={activePage}
              rowsPerPage={_rowsPerPage}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
          )}
        </Box>
        {slots?.footer && slots.footer}
      </Stack>
    </Paper>
  );
};
