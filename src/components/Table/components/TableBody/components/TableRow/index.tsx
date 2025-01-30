import { Box, Checkbox, TableCell, TableRow as MuiTableRow, useTheme } from '@mui/material';
import React from 'react';
import { TABLE_CELL_DEFAULTS } from '../../../../constants';
import { TableRowProps } from './types';

const getRowStyles = (isSelected: boolean) => {
  return {
    cursor: 'pointer',
    ...(isSelected && {
      backgroundColor: 'rgb(137 196 244 / 16%)',
    }),
  };
};

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
  item,
  columns,
  handleRowClick,
  handleSelectRowClick,
  isRowSelected,
  isRowSelectable,
}: TableRowProps) => {
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
          sx: getRowStyles(isSelected),
        }
      : {};
  };

  const getColumnStyles = React.useCallback(
    (hasSortableValue: boolean, textAlign: string) => ({
      display: 'flex',
      alignItems: 'center',
      pl: hasSortableValue && textAlign !== 'center' ? theme.typography.pxToRem(18 + 1.6) : 0, // 18px is the width of the arrow icon + 1.6px is the padding between the icon and the text
    }),
    [theme]
  );

  return (
    <MuiTableRow {...selectableRowProps(item, isRowSelected)}>
      {!!handleSelectRowClick && (
        <TableCell
          component="td"
          scope="row"
          align="center"
          sx={{
            p: theme.typography.pxToRem(11),
          }}
        >
          <Checkbox
            color={'primary'}
            checked={isRowSelected}
            onClick={(event) => handleSelectRowClick(event, item)}
            disabled={!isRowSelectable}
            size="small"
          />
        </TableCell>
      )}
      {columns.map(({ id, data, cell }) => {
        const show = cell?.show ?? TABLE_CELL_DEFAULTS.SHOW;
        const props = {
          ...TABLE_CELL_DEFAULTS.PROPS,
          ...cell?.props,
        };

        return show ? (
          <TableCell
            key={id}
            component="td"
            scope="row"
            sx={{
              p: theme.typography.pxToRem(11),
            }}
            {...props}
          >
            <Box
              sx={getColumnStyles(!!data?.columnSortableValuePath, props?.align)}
              justifyContent={getFlexPropertyByTextAlign(props?.align)}
            >
              {data.render({ data: item })}
            </Box>
          </TableCell>
        ) : null;
      })}
    </MuiTableRow>
  );
};
