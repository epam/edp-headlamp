import React from 'react';

export interface PaginationProps {
    dataCount: number;
    rowsPerPage: number;
    page: number;
    handleChangePage: (event: unknown, newPage: number) => void;
    handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
