import {
    Box,
    ButtonBase,
    Checkbox,
    Grid,
    SvgIcon,
    TableCell,
    TableHead as MuiTableHead,
    TableRow,
    Typography,
    useTheme,
} from '@material-ui/core';
import React from 'react';
import { rem } from '../../../../utils/styling/rem';
import { Render } from '../../../Render';
import { SORT_ORDERS } from '../../constants';
import { TableColumn } from '../../types';
import { TableHeadProps } from './types';

export const TableHead = ({
    columns,
    upperColumns,
    sortOrder,
    setSortOrder,
    defaultSortBy = 'name',
    setColumnSortableValuePath,
    rowCount,
    selected,
    handleSelectAllClick,
}: TableHeadProps) => {
    const theme = useTheme();

    const [sortBy, setSortBy] = React.useState<string>(defaultSortBy);

    const handleRequestSort = (column: TableColumn<any>) => {
        const isDesc = sortBy === column.id && sortOrder === SORT_ORDERS.DESC;
        const isAsc = sortBy === column.id && sortOrder === SORT_ORDERS.ASC;
        setSortOrder(isDesc ? SORT_ORDERS.ASC : isAsc ? SORT_ORDERS.UNSET : SORT_ORDERS.DESC);
        setSortBy(column.id);
        setColumnSortableValuePath(column.columnSortableValuePath);
    };

    const numSelected = React.useMemo(() => selected?.length, [selected]);

    return (
        <MuiTableHead>
            <Render condition={!!upperColumns && !!upperColumns.length}>
                <TableRow>
                    {upperColumns && upperColumns.length
                        ? upperColumns.map(column => {
                              return column.show !== false ? (
                                  <TableCell
                                      key={column.id}
                                      component="th"
                                      scope="row"
                                      align={column.textAlign || 'left'}
                                      colSpan={column.colSpan || 1}
                                      style={{
                                          color: theme.palette.tables.head.text,
                                          backgroundColor: theme.palette.tables.head.background,
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
                                          {column.render()}
                                      </Box>
                                  </TableCell>
                              ) : null;
                          })
                        : null}
                </TableRow>
            </Render>
            <TableRow>
                <Render condition={!!handleSelectAllClick}>
                    <TableCell
                        padding="checkbox"
                        style={{
                            color: theme.palette.tables.head.text,
                            backgroundColor: theme.palette.tables.head.background,
                        }}
                    >
                        <Checkbox
                            color={'primary'}
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={handleSelectAllClick}
                        />
                    </TableCell>
                </Render>
                {columns.map(column => {
                    const activeColumnSort = sortBy === column.id;
                    const upperArrowFillColor =
                        activeColumnSort && sortOrder === SORT_ORDERS.DESC
                            ? theme.palette.action.disabledBackground
                            : theme.palette.action.active;
                    const bottomArrowFillColor =
                        activeColumnSort && sortOrder === SORT_ORDERS.ASC
                            ? theme.palette.action.disabledBackground
                            : theme.palette.action.active;

                    return column.show !== false ? (
                        <TableCell
                            key={column.id}
                            sortDirection={sortBy === column.id ? sortOrder : false}
                            align={column.textAlign || 'left'}
                            style={{
                                color: theme.palette.tables.head.text,
                                backgroundColor: theme.palette.tables.head.background,
                            }}
                        >
                            <Grid container spacing={1} alignItems={'center'} wrap={'nowrap'}>
                                {column.columnSortableValuePath ? (
                                    <Grid item>
                                        <ButtonBase
                                            onClick={() => handleRequestSort(column)}
                                            disableRipple
                                        >
                                            <SvgIcon
                                                viewBox={'0 0 18 18'}
                                                width={theme.typography.pxToRem(18)}
                                                height={theme.typography.pxToRem(18)}
                                                style={{
                                                    width: theme.typography.pxToRem(18),
                                                    height: theme.typography.pxToRem(18),
                                                    display: 'block',
                                                }}
                                            >
                                                <path
                                                    d="M5.25 6L9 2.25L12.75 6H5.25Z"
                                                    fill={upperArrowFillColor}
                                                />
                                                <path
                                                    d="M5.25 12L9 15.75L12.75 12H5.25Z"
                                                    fill={bottomArrowFillColor}
                                                />
                                            </SvgIcon>
                                        </ButtonBase>
                                    </Grid>
                                ) : null}
                                <Grid item>
                                    <Typography
                                        variant={'body1'}
                                        style={{ fontWeight: 600, marginTop: rem(2) }}
                                    >
                                        {column.label}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </TableCell>
                    ) : null;
                })}
            </TableRow>
        </MuiTableHead>
    );
};
