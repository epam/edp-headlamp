import { CircularProgress, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { usePagination } from '../../hooks/usePagination';
import { EmptyList } from '../EmptyList';
import { Render } from '../Render';
import { Pagination } from './components/Pagination';
import { useReadyData } from './hooks/useReadyData';
import { DataGridProps } from './types';

export const DataGrid = <DataType extends unknown>({
    isLoading,
    error,
    spacing,
    renderItem,
    filterFunction,
    data,
    showPagination = true,
    reflectInURL = false,
    initialPage = 0,
    rowsPerPage = 9,
    emptyListComponent,
}: DataGridProps<DataType>) => {
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
        entityName: 'grid',
    });

    const readyData = useReadyData<DataType>({
        data,
        filterFunction,
        isLoading: data === null,
        error,
    });

    const hasEmptyResult = React.useMemo(() => {
        if (!data || !readyData) {
            return;
        }

        return !!data.length && !readyData?.length;
    }, [data, readyData]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                {error ? (
                    <Grid container justifyContent={'center'}>
                        <Grid item>
                            <Typography color={'error'} variant={'h6'}>
                                {error.toString()}
                            </Typography>
                        </Grid>
                    </Grid>
                ) : isLoading ? (
                    <Grid container justifyContent={'center'}>
                        <Grid item>
                            <CircularProgress />
                        </Grid>
                    </Grid>
                ) : readyData?.length ? (
                    <Grid container spacing={spacing}>
                        {readyData
                            .slice(page * _rowsPerPage, page * _rowsPerPage + _rowsPerPage)
                            .map(item => {
                                return <>{renderItem(item)}</>;
                            })}
                    </Grid>
                ) : hasEmptyResult ? (
                    <EmptyList customText={'No results found!'} isSearch />
                ) : !data?.length ? (
                    <>{emptyListComponent}</>
                ) : null}
            </Grid>
            <Render condition={showPagination && data?.length > _rowsPerPage}>
                <Grid item xs={12}>
                    <Pagination
                        dataCount={readyData && readyData.length}
                        page={page}
                        rowsPerPage={_rowsPerPage}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Grid>
            </Render>
        </Grid>
    );
};
