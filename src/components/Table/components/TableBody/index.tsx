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
import { EmptyList } from '../../../EmptyList';
import { Render } from '../../../Render';
import { TableBodyProps } from './types';

const isSelectedRow = (isSelected: (row: unknown) => boolean, row: unknown) =>
    isSelected ? isSelected(row) : false;

const getRowStyles = (isSelected: boolean) =>
    isSelected
        ? {
              backgroundColor: 'rgb(137 196 244 / 16%)',
              cursor: 'pointer',
          }
        : { cursor: 'pointer' };

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
    hasEmptyResult,
}: TableBodyProps) => {
    const theme = useTheme();

    const selectableRowProps = (row: unknown, isSelected: boolean) => {
        return handleRowClick
            ? {
                  hover: true,
                  role: 'radio',
                  'aria-checked': isSelected,
                  selected: isSelected,
                  tabIndex: -1,
                  onClick: (event: React.MouseEvent<HTMLTableRowElement>) => {
                      handleRowClick(event, row);
                  },
                  style: getRowStyles(isSelected),
              }
            : {};
    };

    const getColumnStyles = React.useCallback(
        (hasSortableValue: boolean) => ({
            display: 'flex',
            alignItems: 'center',
            pl: hasSortableValue ? theme.typography.pxToRem(6) : 0,
        }),
        [theme]
    );

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
                            const _isSelected = isSelectedRow(isSelected, item);

                            return (
                                <TableRow
                                    key={`table-row-${idx}`}
                                    {...selectableRowProps(item, _isSelected)}
                                >
                                    <Render condition={!!handleSelectRowClick}>
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color={'primary'}
                                                checked={_isSelected}
                                                onClick={event => handleSelectRowClick(event, item)}
                                            />
                                        </TableCell>
                                    </Render>
                                    {columns.map(
                                        ({
                                            show = true,
                                            id,
                                            textAlign = 'left',
                                            columnSortableValuePath,
                                            render,
                                        }) => {
                                            return (
                                                <Render condition={show} key={id}>
                                                    <TableCell
                                                        component="th"
                                                        scope="row"
                                                        align={textAlign || 'left'}
                                                        style={{
                                                            padding: `${theme.typography.pxToRem(
                                                                12
                                                            )} ${theme.typography.pxToRem(16)}`,
                                                        }}
                                                    >
                                                        <Box
                                                            sx={getColumnStyles(
                                                                !!columnSortableValuePath
                                                            )}
                                                        >
                                                            {render(item)}
                                                        </Box>
                                                    </TableCell>
                                                </Render>
                                            );
                                        }
                                    )}
                                </TableRow>
                            );
                        })}
                </>
            ) : hasEmptyResult ? (
                <TableRow>
                    <TableCell colSpan={columns.length} align={'center'}>
                        <EmptyList customText={'No results found!'} isSearch />
                    </TableCell>
                </TableRow>
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
