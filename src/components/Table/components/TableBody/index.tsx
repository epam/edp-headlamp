import {
    Box,
    Checkbox,
    CircularProgress,
    TableBody as MuiTableBody,
    TableCell,
    TableRow,
    Typography,
    useTheme,
} from '@material-ui/core';
import React from 'react';
import { Render } from '../../../Render';
import { TableBodyProps } from './types';

export const TableBody = ({
    error,
    isLoading,
    columns,
    readyData,
    handleRowClick,
    handleSelectRowClick,
    isSelected,
    emptyListComponent,
    page,
    rowsPerPage,
}: TableBodyProps) => {
    const theme = useTheme();

    const [selectedRowIndex, setSelectedRowIndex] = React.useState<number>(null);

    const selectableRowProps = (row: any, idx: number) => {
        const _isSelected = isSelected ? isSelected(row) : false;

        return handleRowClick
            ? {
                  hover: true,
                  role: 'radio',
                  'aria-checked': selectedRowIndex === idx,
                  selected: isSelected ? _isSelected : selectedRowIndex === idx,
                  tabIndex: -1,
                  onClick: (event: React.MouseEvent<HTMLTableRowElement>) => {
                      setSelectedRowIndex(idx);
                      handleRowClick(event, row);
                  },
                  style: _isSelected
                      ? {
                            backgroundColor: 'rgb(137 196 244 / 16%)',
                            cursor: 'pointer',
                        }
                      : { cursor: 'pointer' },
              }
            : {};
    };

    return (
        <MuiTableBody>
            {error ? (
                <TableRow>
                    <TableCell colSpan={columns.length} align={'center'}>
                        <Typography color={'error'} variant={'h6'}>
                            {error.toString()}
                        </Typography>
                    </TableCell>
                </TableRow>
            ) : isLoading ? (
                <TableRow>
                    <TableCell colSpan={columns.length} align={'center'}>
                        <CircularProgress />
                    </TableCell>
                </TableRow>
            ) : readyData?.length ? (
                <>
                    {readyData
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((item, idx: number) => {
                            const isItemSelected = isSelected ? isSelected(item) : false;

                            return (
                                <TableRow
                                    key={`table-row-${idx}`}
                                    {...selectableRowProps(item, idx)}
                                >
                                    <Render condition={!!handleSelectRowClick}>
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color={'primary'}
                                                checked={isItemSelected}
                                                onClick={event => handleSelectRowClick(event, item)}
                                            />
                                        </TableCell>
                                    </Render>
                                    {columns.map(column => {
                                        return column.show !== false ? (
                                            <TableCell
                                                key={column.id}
                                                component="th"
                                                scope="row"
                                                align={column.textAlign || 'left'}
                                                style={{
                                                    padding: `${theme.typography.pxToRem(
                                                        8
                                                    )} ${theme.typography.pxToRem(16)}`,
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        pl: column.columnSortableValuePath
                                                            ? theme.typography.pxToRem(6)
                                                            : 0,
                                                    }}
                                                >
                                                    {column.render(item)}
                                                </Box>
                                            </TableCell>
                                        ) : null;
                                    })}
                                </TableRow>
                            );
                        })}
                </>
            ) : (
                <TableRow>
                    <TableCell colSpan={columns.length} align={'center'}>
                        <>{emptyListComponent}</>
                    </TableCell>
                </TableRow>
            )}
        </MuiTableBody>
    );
};
