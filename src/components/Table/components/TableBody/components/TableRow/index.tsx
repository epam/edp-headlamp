import { Box, Checkbox, TableCell, TableRow as MuiTableRow, useTheme } from '@mui/material';
import React from 'react';
import { TableRowProps } from './types';

const getRowStyles = (isSelected: boolean) =>
  isSelected
    ? {
        backgroundColor: 'rgb(137 196 244 / 16%)',
        cursor: 'pointer',
      }
    : { cursor: 'pointer' };

export const TableRow = ({
  item,
  columns,
  handleRowClick,
  handleSelectRowClick,
  isSelected,
  canBeSelected,
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
    <MuiTableRow {...selectableRowProps(item, isSelected)}>
      {!!handleSelectRowClick && (
        <TableCell padding="checkbox">
          {canBeSelected && (
            <Checkbox
              color={'primary'}
              checked={isSelected}
              onClick={(event) => handleSelectRowClick(event, item)}
            />
          )}
        </TableCell>
      )}
      {columns.map(({ show = true, id, textAlign = 'left', columnSortableValuePath, render }) => {
        return show ? (
          <TableCell
            key={id}
            component="th"
            scope="row"
            align={textAlign || 'left'}
            sx={{
              p: `${theme.typography.pxToRem(5)} ${theme.typography.pxToRem(8)}`,
            }}
          >
            <Box
              sx={getColumnStyles(!!columnSortableValuePath)}
              justifyContent={textAlign === 'center' ? 'center' : 'flex-start'}
            >
              {render(item)}
            </Box>
          </TableCell>
        ) : null;
      })}
    </MuiTableRow>
  );
};
