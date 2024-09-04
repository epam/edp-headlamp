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
import { rem } from '../../../../../../utils/styling/rem';
import { SORT_ORDERS } from '../../../../constants';
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
      sortFn: column.columnSortableValuePath
        ? createSortFunction(newSortOrder, column.columnSortableValuePath)
        : createCustomSortFunction(newSortOrder, column.customSortFn),
      sortBy: column.id,
    });
  };

  const numSelected = React.useMemo(() => selected?.length, [selected]);

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

  const _rowCount = selectableRowCount || rowCount;

  return (
    <MuiTableRow>
      {!!handleSelectAllClick && (
        <TableCell
          component="th"
          scope="row"
          align="center"
          sx={{
            p: `${theme.typography.pxToRem(5)} ${theme.typography.pxToRem(11)}`,
          }}
        >
          <Checkbox
            color={'primary'}
            indeterminate={numSelected > 0 && numSelected < _rowCount}
            checked={rowCount > 0 && numSelected === _rowCount}
            onChange={handleSelectAllClick}
          />
        </TableCell>
      )}
      {columns.map((column) => {
        const {
          show = true,
          id,
          textAlign = 'left',
          columnSortableValuePath,
          customSortFn,
          label,
        } = column;
        const activeColumnSort = sort.sortBy === id;
        const { upperArrowColor, bottomArrowColor } = getArrowsColors(activeColumnSort, sort.order);

        return show ? (
          <TableCell
            component="th"
            scope="row"
            key={id}
            sortDirection={sort.sortBy === id ? sort.order : false}
            align={textAlign}
            sx={{
              color: theme.palette.text.primary,
              p: `${theme.typography.pxToRem(16)} ${theme.typography.pxToRem(11)}`,
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              alignItems={'center'}
              flexWrap="nowrap"
              justifyContent={getFlexPropertyByTextAlign(textAlign)}
            >
              {(!!columnSortableValuePath || !!customSortFn) && (
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
              <Typography variant={'body1'} sx={{ fontWeight: 600, marginTop: rem(2) }}>
                {label}
              </Typography>
            </Stack>
          </TableCell>
        ) : null;
      })}
    </MuiTableRow>
  );
};
