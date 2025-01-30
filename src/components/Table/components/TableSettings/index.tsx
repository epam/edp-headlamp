import { Icon } from '@iconify/react';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Stack,
  Tooltip,
} from '@mui/material';
import React from 'react';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { Table } from '../..';
import {
  TABLE_CELL_DEFAULTS,
  TABLE_DEFAULT_WIDTH,
  TABLE_DEFAULT_WIDTH_WITH_SELECTION,
} from '../../constants';
import { TableColumn } from '../../types';
import { useTableSettings } from './hooks/useTableSettings';
import { TableSettingColumn, TableSettingsColumns, TableSettingsProps } from './types';

const getSettingsColumns = <DataType extends unknown>(columns: TableColumn<DataType>[]) => {
  return columns.reduce<TableSettingsColumns<DataType>>((acc, cur) => {
    acc[cur.id] = {
      id: cur.id,
      label: cur.label,
      show: true,
      disabled: cur.cell?.customizable === false,
    };
    return acc;
  }, {});
};

const getShownColumnIds = <DataType extends unknown>(columns: TableColumn<DataType>[]) => {
  return columns.filter(({ cell: { show } }) => !!show).map(({ id }) => id);
};

export const TableSettings = <DataType extends unknown>({
  id,
  name,
  rememberSettings: _rememberSettings,
  originalColumns,
  columns,
  setColumns,
  hasSelection,
}: TableSettingsProps<DataType>) => {
  const { saveSettings } = useTableSettings(id);
  const [open, setOpen] = React.useState(false);
  const [rememberSettings, setRememberSettings] = React.useState(_rememberSettings);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selected, setSelected] = React.useState<string[]>(getShownColumnIds(columns));

  const handleSelectAllClick = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, items: TableSettingColumn<DataType>[]) => {
      if (event.target.checked) {
        const newSelected = items.map(({ id }) => id);
        setSelected(newSelected);
        return;
      }
      const disabledItems = items.filter(({ disabled }) => disabled).map(({ id }) => id);

      setSelected(disabledItems);
    },
    []
  );

  const handleSelectRowClick = React.useCallback(
    (event: React.MouseEvent<unknown>, row: TableSettingColumn<DataType>) => {
      const name = row.id;
      const selectedIndex = selected.indexOf(name);
      let newSelected: string[] = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }

      setSelected(newSelected);
    },
    [selected]
  );

  const handleSave = () => {
    setColumns((prev) => {
      const totalFixedVisibleWidth = prev.reduce(
        (acc, column) =>
          acc +
          (column.cell.isFixed && selected.includes(column.id)
            ? originalColumns.find((origCol) => origCol.id === column.id).cell.baseWidth
            : 0),
        hasSelection ? TABLE_CELL_DEFAULTS.WIDTH : 0
      );

      const totalProportionalVisibleWidth = prev.reduce(
        (acc, column) =>
          acc +
          (!column.cell.isFixed && selected.includes(column.id)
            ? originalColumns.find((origCol) => origCol.id === column.id).cell.baseWidth
            : 0),
        0
      );

      const availableProportionalWidth =
        (hasSelection ? TABLE_DEFAULT_WIDTH : TABLE_DEFAULT_WIDTH_WITH_SELECTION) -
        totalFixedVisibleWidth;

      const scalingFactor = availableProportionalWidth / totalProportionalVisibleWidth;

      const result = prev.reduce(
        (accumulator, column) => {
          const origColumn = originalColumns.find((origCol) => origCol.id === column.id);

          if (column.cell.isFixed) {
          }

          // Correctly assigning newWidth
          const newWidth = column.cell.isFixed
            ? column.cell.width // Use current width for fixed columns
            : selected.includes(column.id)
            ? Math.round(origColumn.cell.baseWidth * scalingFactor)
            : column.cell.width;

          accumulator.columns.push({
            ...column,
            cell: {
              ...column.cell,
              width: newWidth,
              show: selected.includes(column.id),
            },
          });

          accumulator.settings = {
            ...accumulator.settings,
            [column.id]: {
              id: column.id,
              show: selected.includes(column.id),
              width: newWidth, // Ensure width is stored for all columns
            },
          };

          return accumulator;
        },
        { columns: [], settings: {} }
      );

      if (rememberSettings) {
        saveSettings(result.settings);
      }

      return result.columns;
    });
    handleClose();
  };

  return (
    <>
      <Tooltip title={'Table Settings'}>
        <IconButton onClick={handleOpen}>
          <Icon icon={ICONS.SETTINGS} />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{`Table "${name}" Settings`}</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <Table
              id="tableSettings"
              name="Table Settings"
              isLoading={false}
              data={Object.values(getSettingsColumns(columns))}
              columns={[
                {
                  id: 'column',
                  label: 'Column Name',
                  data: {
                    render: ({ data }) => data.label,
                  },
                  cell: {
                    baseWidth: 95,
                  },
                },
              ]}
              selection={{
                handleSelectAll: handleSelectAllClick,
                handleSelectRow: handleSelectRowClick,
                selected,
                isRowSelected: (row) => selected.includes(row.id),
                isRowSelectable: (row) => !row.disabled,
              }}
              settings={{
                show: false,
              }}
              pagination={{
                rowsPerPage: columns.length,
                show: false,
              }}
            />
            <Stack direction="row" justifyContent="flex-end">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberSettings}
                    onChange={({ target: { checked } }) => setRememberSettings(checked)}
                  />
                }
                label="Remember This Table Settings"
              />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>close</Button>
          <Button onClick={handleSave}>save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
