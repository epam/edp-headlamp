import { Box, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { usePagination } from '../../hooks/usePagination';
import { EmptyList } from '../EmptyList';
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

  const isReadyDataLoading = readyData === null;

  const hasEmptyResult = React.useMemo(() => {
    if (isLoading && isReadyDataLoading) {
      return false;
    }

    return !!data?.length && !readyData?.length;
  }, [data, isLoading, isReadyDataLoading, readyData]);

  const renderGrid = React.useCallback(() => {
    if (error) {
      return (
        <Box display="flex" justifyContent={'center'}>
          <Typography color={'error'} variant={'h6'}>
            {error.toString()}
          </Typography>
        </Box>
      );
    }

    if (isLoading) {
      return (
        <Box display="flex" justifyContent={'center'}>
          <CircularProgress />
        </Box>
      );
    }

    if (readyData !== null) {
      return (
        <Grid container spacing={spacing}>
          {readyData.slice(page * _rowsPerPage, page * _rowsPerPage + _rowsPerPage).map((item) => {
            return <>{renderItem(item)}</>;
          })}
        </Grid>
      );
    }

    if (hasEmptyResult) {
      return <EmptyList customText={'No results found!'} isSearch />;
    }

    return <>{emptyListComponent}</>;
  }, [
    _rowsPerPage,
    emptyListComponent,
    error,
    hasEmptyResult,
    isLoading,
    page,
    readyData,
    renderItem,
    spacing,
  ]);

  return (
    <Stack spacing={2}>
      {renderGrid()}
      {showPagination && data?.length > _rowsPerPage && (
        <Pagination
          dataCount={readyData && readyData.length}
          page={page}
          rowsPerPage={_rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </Stack>
  );
};
