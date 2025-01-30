import {
  ButtonBase,
  Checkbox,
  Stack,
  SvgIcon,
  TableCell,
  TableRow as MuiTableRow,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import { ValueOf } from '../../../../../../types/global';
import { SORT_ORDERS, TABLE_CELL_DEFAULTS } from '../../../../constants';
import { TableColumn } from '../../../../types';
import {
  createCustomSortFunction,
  createSortFunction,
  getFlexPropertyByTextAlign,
  getSortOrder,
  isAsc,
  isDesc,
} from '../../../../utils';
import { TableRowProps } from './types';

export const TableRow = ({
  columns,
  sort,
  setSort,
  rowCount,
  selected,
  handleSelectAllClick,
  selectableRowCount,
}: TableRowProps) => {
  const theme = useTheme();

  const handleRequestSort = (column: TableColumn<any>) => {
    const _isDesc = isDesc(column.id, sort.sortBy, sort.order);
    const _isAsc = isAsc(column.id, sort.sortBy, sort.order);
    const newSortOrder = getSortOrder(_isDesc, _isAsc);

    setSort({
      order: newSortOrder,
      sortFn: column.data.columnSortableValuePath
        ? createSortFunction(newSortOrder, column.data.columnSortableValuePath)
        : createCustomSortFunction(newSortOrder, column.data.customSortFn),
      sortBy: column.id,
    });
  };

  const selectedLength = React.useMemo(() => selected?.length, [selected]);

  const getArrowsColors = React.useCallback(
    (activeColumnSort: boolean, sortOrder: ValueOf<typeof SORT_ORDERS>) => {
      return {
        upperArrowColor:
          activeColumnSort && sortOrder === SORT_ORDERS.DESC
            ? theme.palette.action.disabledBackground
            : theme.palette.action.active,
        bottomArrowColor:
          activeColumnSort && sortOrder === SORT_ORDERS.ASC
            ? theme.palette.action.disabledBackground
            : theme.palette.action.active,
      };
    },
    [theme]
  );

  return (
    <MuiTableRow>
      {!!handleSelectAllClick && (
        <TableCell
          component="th"
          scope="row"
          align="center"
          sx={{
            p: `${theme.typography.pxToRem(5)} ${theme.typography.pxToRem(11)}`,
            verticalAlign: 'bottom',
          }}
        >
          <Checkbox
            color={'primary'}
            indeterminate={selectedLength > 0 && selectedLength < selectableRowCount}
            checked={selectedLength === selectableRowCount || selectedLength === rowCount}
            onChange={handleSelectAllClick}
          />
        </TableCell>
      )}
      {columns.map((column) => {
        const { id, label, data, cell } = column;
        const show = cell?.show ?? TABLE_CELL_DEFAULTS.SHOW;
        const props = {
          ...TABLE_CELL_DEFAULTS.PROPS,
          ...cell?.props,
        };

        const activeColumnSort = sort.sortBy === id;
        const { upperArrowColor, bottomArrowColor } = getArrowsColors(activeColumnSort, sort.order);

        return show ? (
          <TableCell
            component="th"
            scope="row"
            key={id}
            sortDirection={sort.sortBy === id ? sort.order : false}
            sx={{
              color: theme.palette.text.primary,
              p: `${theme.typography.pxToRem(16)} ${theme.typography.pxToRem(11)}`,
              verticalAlign: 'bottom',
            }}
            {...props}
          >
            <Stack
              direction="row"
              spacing={0.2}
              alignItems={'center'}
              flexWrap="nowrap"
              justifyContent={getFlexPropertyByTextAlign(props?.align)}
            >
              {(!!data?.columnSortableValuePath || !!data?.customSortFn) && (
                <ButtonBase onClick={() => handleRequestSort(column)} disableRipple>
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
                    <path d="M5.25 6L9 2.25L12.75 6H5.25Z" fill={upperArrowColor} />
                    <path d="M5.25 12L9 15.75L12.75 12H5.25Z" fill={bottomArrowColor} />
                  </SvgIcon>
                </ButtonBase>
              )}
              <Typography
                variant={'body1'}
                sx={{
                  fontSize: (t) => t.typography.pxToRem(14),
                  fontWeight: 600,
                  marginTop: (t) => t.typography.pxToRem(2),
                }}
              >
                {label}
              </Typography>
            </Stack>
          </TableCell>
        ) : null;
      })}
    </MuiTableRow>
  );
};
