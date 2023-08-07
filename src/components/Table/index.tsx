import { Paper, Table as MuiTable } from '@material-ui/core';
import React from 'react';
import { ValueOf } from '../../types/global';
import { rem } from '../../utils/styling/rem';
import { Render } from '../Render';
import { TableBody } from './components/TableBody';
import { TableHead } from './components/TableHead';
import { TablePagination } from './components/TablePagination';
import { SORT_ORDERS } from './constants';
import { usePagination } from './hooks/usePagination';
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
    rowsPerPage = 10,
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
    const hasEmptyResult = !!filterFunction && !readyData?.length;

    return (
        <Paper variant={'outlined'}>
            <MuiTable style={{ borderRadius: rem(5), overflow: 'hidden' }}>
                <colgroup>
                    {handleSelectRowClick ? <col key={'select-checkbox'} width={'4%'} /> : null}
                    {columns.map(
                        column =>
                            column.show !== false && (
                                <col key={column.id} width={column.width || '100%'} />
                            )
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
            <Render condition={showPagination && data?.length > _rowsPerPage}>
                <TablePagination
                    dataCount={readyData && readyData.length}
                    page={page}
                    rowsPerPage={_rowsPerPage}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Render>
        </Paper>
    );
};
