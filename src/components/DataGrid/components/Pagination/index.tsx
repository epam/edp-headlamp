import { TablePagination as MuiTablePagination } from '@material-ui/core';
import React from 'react';
import { PaginationProps } from './types';

export const Pagination = ({
    dataCount,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
}: PaginationProps) => {
    return (
        <MuiTablePagination
            rowsPerPageOptions={[9, 18, 36, 48, 64, 72]}
            component="div"
            count={dataCount || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={'Cards per page:'}
        />
    );
};
