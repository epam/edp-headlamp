import {
  alpha,
  Box,
  ButtonBase,
  Checkbox,
  Stack,
  SvgIcon,
  TableCell,
  TableHead as MuiTableHead,
  TableRow as MuiTableRow,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import { ValueOf } from '../../../../types/global';
import { SORT_ORDERS, TABLE_CELL_DEFAULTS } from '../../constants';
import { TableColumn } from '../../types';
import {
  createCustomSortFunction,
  createSortFunction,
  getFlexPropertyByTextAlign,
  getSortOrder,
  isAsc,
  isDesc,
} from '../../utils';
import { useTableSettings } from '../TableSettings/hooks/useTableSettings';
import { SavedTableSettings } from '../TableSettings/types';
import { TableHeadProps } from './types';

export const TableHead = <DataType extends unknown>({
  tableId,
  columns,
  colGroupRef,
  sort,
  setSort,
  rowCount,
  selectableRowCount,
  selected,
  handleSelectAllClick,
  minimal,
}: TableHeadProps<DataType>) => {
  const theme = useTheme();

  const { loadSettings, saveSettings } = useTableSettings(tableId);

  const tableSettings = loadSettings();

  const handleRequestSort = (column: TableColumn<DataType>) => {
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

  const saveNewColumnsWidth = React.useCallback(() => {
    if (!tableSettings) return;
    const colGroup = colGroupRef.current;
    const cols = (colGroup ? Array.from(colGroup.children) : []) as HTMLTableColElement[];

    const newSettings = columns.reduce<SavedTableSettings>((acc, cur) => {
      acc[cur.id] = {
        ...tableSettings[cur.id],
        width: parseFloat(
          cols.find((col) => col.dataset.id === cur.id)?.getAttribute('width') || ''
        ),
      };

      return acc;
    }, {});

    saveSettings(newSettings);
  }, [colGroupRef, columns, saveSettings, tableSettings]);

  const handleMouseDown = React.useCallback(
    (event, resizableColumnId) => {
      event.preventDefault();

      const resizerElement = event.target;
      resizerElement.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
      document.body.style.cursor = 'col-resize';

      const startX = event.clientX;
      const colGroup = colGroupRef.current;
      const cols = (colGroup ? Array.from(colGroup.children) : []) as HTMLTableColElement[];
      const targetCol = cols.find((col) => col.dataset.id === resizableColumnId);

      if (!targetCol) return;

      let nextColIndex = cols.indexOf(targetCol) + 1;
      let nextCol = null;
      while (nextColIndex < cols.length) {
        const potentialNextCol = cols[nextColIndex];
        const nextColumnData = columns.find((col) => col.id === potentialNextCol.dataset.id);
        if (nextColumnData && nextColumnData.cell.show !== false) {
          nextCol = potentialNextCol;
          break;
        }
        nextColIndex++;
      }

      if (!nextCol) return;

      const originalWidth = targetCol.offsetWidth;
      const nextOriginalWidth = nextCol.offsetWidth;
      const tableWidth = colGroup?.parentElement?.offsetWidth;

      const handleMouseMove = (moveEvent: Event | React.MouseEvent) => {
        if (!tableWidth) {
          return;
        }

        const deltaX = (moveEvent as React.MouseEvent).clientX - startX;

        const column = columns.find((col) => col.id === resizableColumnId);
        const nextColumn = columns.find((col) => col.id === nextCol.dataset.id);
        if (!column || column.cell.isFixed || !nextColumn || nextColumn.cell.isFixed) return;

        const newWidth = originalWidth + deltaX;
        const newNextWidth = nextOriginalWidth - deltaX;

        if (newWidth + newNextWidth <= tableWidth) {
          const newTargetColWidth = `${((newWidth / tableWidth) * 100).toFixed(3)}%`;
          const newNextColWidth = `${((newNextWidth / tableWidth) * 100).toFixed(3)}%`;

          targetCol.setAttribute('width', newTargetColWidth);
          nextCol.setAttribute('width', newNextColWidth);
        }
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);

        resizerElement.style = '';
        document.body.style.cursor = '';
        saveNewColumnsWidth();
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [colGroupRef, columns, saveNewColumnsWidth]
  );

  const selectedAllIndeterminate =
    !!selectedLength && selectedLength > 0 && selectedLength < rowCount;
  const selectAllChecked = selectedLength === selectableRowCount || selectedLength === rowCount;

  return (
    <MuiTableHead>
      <MuiTableRow>
        {!!handleSelectAllClick && !!selectableRowCount && (
          <TableCell
            component="th"
            scope="row"
            align="center"
            sx={{
              p: minimal
                ? theme.typography.pxToRem(4)
                : `${theme.typography.pxToRem(5)} ${theme.typography.pxToRem(11)}`,
              verticalAlign: 'bottom',
            }}
          >
            <Checkbox
              color={'primary'}
              indeterminate={selectedAllIndeterminate}
              checked={selectAllChecked}
              onChange={handleSelectAllClick}
              size={minimal ? 'small' : 'medium'}
            />
          </TableCell>
        )}
        {columns.map((column, idx) => {
          const isLast = idx === columns.length - 1;
          const { id, label, data, cell } = column;
          const show = cell?.show ?? TABLE_CELL_DEFAULTS.SHOW;
          const props = {
            ...TABLE_CELL_DEFAULTS.PROPS,
            ...cell?.props,
          };

          const activeColumnSort = sort.sortBy === id;
          const { upperArrowColor, bottomArrowColor } = getArrowsColors(
            activeColumnSort,
            sort.order
          );

          return show ? (
            <TableCell
              key={id}
              component="th"
              scope="row"
              sortDirection={sort.sortBy === id ? sort.order : false}
              sx={{
                color: theme.palette.text.primary,
                p: minimal
                  ? `${theme.typography.pxToRem(4)}`
                  : `${theme.typography.pxToRem(16)} ${theme.typography.pxToRem(11)}`,
                verticalAlign: 'bottom',
                position: 'relative',
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
              {!isLast && !column.cell.isFixed && !columns?.[idx + 1].cell.isFixed && (
                <Box
                  sx={{
                    margin: 0,
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    width: '1px',
                    height: '100%',
                    padding: '0 5px',
                    translate: '50% 0',
                    zIndex: 1,
                    cursor: 'col-resize',

                    '&:hover': {
                      backgroundColor: (t) => alpha(t.palette.divider, 0.05),
                    },
                  }}
                  onMouseDown={(e) => handleMouseDown(e, column.id)}
                />
              )}
            </TableCell>
          ) : null;
        })}
      </MuiTableRow>
    </MuiTableHead>
  );
};
