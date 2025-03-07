import { Icon } from '@iconify/react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Tooltip,
} from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { ValueOf } from '../../../../types/global';
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

const NAMES = {
  selected: 'selected',
} as const;

export const TableSettings = <DataType extends unknown>({
  id,
  name,
  originalColumns,
  columns,
  setColumns,
  hasSelection,
}: TableSettingsProps<DataType>) => {
  const {
    reset,
    setValue,
    getValues,
    watch,
    formState: { isDirty },
  } = useForm<Record<ValueOf<typeof NAMES>, any>>({
    mode: 'onChange',
    defaultValues: {
      [NAMES.selected]: getShownColumnIds(columns),
    },
  });

  const { saveSettings } = useTableSettings(id);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);

    reset();
  };

  const handleSelectAllClick = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, items: TableSettingColumn<DataType>[]) => {
      if (event.target.checked) {
        const newSelected = items.map(({ id }) => id);
        setValue(NAMES.selected, newSelected, { shouldDirty: true });
        return;
      }
      const disabledItems = items.filter(({ disabled }) => disabled).map(({ id }) => id);

      setValue(NAMES.selected, disabledItems, { shouldDirty: true });
    },
    [setValue]
  );

  const handleSelectRowClick = React.useCallback(
    (event: React.MouseEvent<unknown>, row: TableSettingColumn<DataType>) => {
      const values = getValues();
      const selected = values.selected;
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

      setValue(NAMES.selected, newSelected, { shouldDirty: true });
    },
    [getValues, setValue]
  );

  const handleSave = () => {
    const values = getValues();
    const selected = values.selected;

    setColumns((prev) => {
      const totalFixedVisibleWidth = prev.reduce(
        (acc, column) =>
          acc +
          ((column.cell.isFixed &&
            selected.includes(column.id) &&
            originalColumns.find((origCol) => origCol.id === column.id)?.cell.baseWidth) ||
            0),
        hasSelection ? TABLE_CELL_DEFAULTS.WIDTH : 0
      );

      const totalProportionalVisibleWidth = prev.reduce(
        (acc, column) =>
          acc +
          ((!column.cell.isFixed &&
            selected.includes(column.id) &&
            originalColumns.find((origCol) => origCol.id === column.id)?.cell.baseWidth) ||
            0),
        0
      );

      const availableProportionalWidth =
        (hasSelection ? TABLE_DEFAULT_WIDTH : TABLE_DEFAULT_WIDTH_WITH_SELECTION) -
        totalFixedVisibleWidth;

      const scalingFactor = availableProportionalWidth / totalProportionalVisibleWidth;

      const result = prev.reduce<{
        columns: TableColumn<DataType>[];
        settings: Record<string, { id: string; show: boolean; width: number }>;
      }>(
        (accumulator, column) => {
          const origColumn = originalColumns.find((origCol) => origCol.id === column.id);

          if (!origColumn) return accumulator;

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

      saveSettings(result.settings);

      return result.columns;
    });

    setOpen(false);
    reset(values, { keepValues: true, keepDirty: false });
  };

  const selected = watch(NAMES.selected);

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
                    render: ({ data }) => data?.label || '',
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
                initialPage: 0,
                reflectInURL: false,
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>close</Button>
          <Button onClick={handleSave} disabled={!isDirty}>
            save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
