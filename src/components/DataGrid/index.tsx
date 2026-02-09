import { Alert, Box, CircularProgress, Grid, Stack } from '@mui/material';
import React from 'react';
import { usePagination } from '../../hooks/usePagination';
import { EmptyList } from '../EmptyList';
import { ErrorContent } from '../ErrorContent';
import { Pagination } from './components/Pagination';
import { useReadyData } from './hooks/useReadyData';
import { DataGridProps } from './types';

export const DataGrid = <DataType extends unknown>({
  isLoading,
  blockerError,
  errors,
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
    error: blockerError,
  });

  const isReadyDataLoading = readyData === null;

  const hasEmptyResult = React.useMemo(() => {
    if (isLoading && isReadyDataLoading) {
      return false;
    }

    return !!data?.length && !readyData?.length;
  }, [data, isLoading, isReadyDataLoading, readyData]);

  const renderGrid = React.useCallback(() => {
    if (blockerError) {
      return (
        <Box display="flex" justifyContent={'center'}>
          <ErrorContent error={blockerError} outlined />
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

    if (readyData !== null && readyData.length > 0) {
      return (
        <Stack spacing={2}>
          <div>
            {errors && !!errors.length && (
              <Alert severity="warning">
                {errors.map((error) => (
                  <div>{error?.message || error?.toString()}</div>
                ))}
              </Alert>
            )}
          </div>
          <div>
            <Grid container spacing={spacing}>
              {readyData
                .slice(page * _rowsPerPage, page * _rowsPerPage + _rowsPerPage)
                .map((item) => {
                  return <>{renderItem(item)}</>;
                })}
            </Grid>
          </div>
        </Stack>
      );
    }

    if (hasEmptyResult) {
      return <EmptyList customText={'No results found!'} isSearch />;
    }

    return <>{emptyListComponent}</>;
  }, [
    blockerError,
    isLoading,
    readyData,
    hasEmptyResult,
    emptyListComponent,
    spacing,
    page,
    _rowsPerPage,
    errors,
    renderItem,
  ]);

  return (
    <Stack spacing={2}>
      <div>{renderGrid()}</div>
      {showPagination && data?.length > _rowsPerPage && (
        <div>
          <Pagination
            dataCount={readyData && readyData.length}
            page={page}
            rowsPerPage={_rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </div>
      )}
    </Stack>
  );
};
