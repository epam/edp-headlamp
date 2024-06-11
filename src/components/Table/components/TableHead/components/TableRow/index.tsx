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
import { TableRowProps } from './types';

const isDesc = (columnId: string, sortBy: string, sortOrder: ValueOf<typeof SORT_ORDERS>) =>
  sortBy === columnId && sortOrder === SORT_ORDERS.DESC;
const isAsc = (columnId: string, sortBy: string, sortOrder: ValueOf<typeof SORT_ORDERS>) =>
  sortBy === columnId && sortOrder === SORT_ORDERS.ASC;

const getSortOrder = (isDesc: boolean, isAsc: boolean) =>
  isDesc ? SORT_ORDERS.ASC : isAsc ? SORT_ORDERS.UNSET : SORT_ORDERS.DESC;

const getFlexPropertyByTextAlign = (textAlign: string) => {
  switch (textAlign) {
    case 'center':
      return 'center';
    case 'right':
      return 'flex-end';
    default:
      return 'flex-start';
  }
};

export const TableRow = ({
  columns,
  sortOrder,
  setSortOrder,
  defaultSortBy = 'name',
  setColumnSortableValuePath,
  rowCount,
  selected,
  handleSelectAllClick,
  selectableRowCount,
}: TableRowProps) => {
  const theme = useTheme();

  const [sortBy, setSortBy] = React.useState<string>(defaultSortBy);

  const handleRequestSort = (column: TableColumn<any>) => {
    const _isDesc = isDesc(column.id, sortBy, sortOrder);
    const _isAsc = isAsc(column.id, sortBy, sortOrder);
    const newSortOrder = getSortOrder(_isDesc, _isAsc);
    setSortOrder(newSortOrder);
    setSortBy(column.id);
    setColumnSortableValuePath(column.columnSortableValuePath);
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
        const { show = true, id, textAlign = 'left', columnSortableValuePath, label } = column;
        const activeColumnSort = sortBy === id;
        const { upperArrowColor, bottomArrowColor } = getArrowsColors(activeColumnSort, sortOrder);

        return show ? (
          <TableCell
            component="th"
            scope="row"
            key={id}
            sortDirection={sortBy === id ? sortOrder : false}
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
              {!!columnSortableValuePath && (
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
