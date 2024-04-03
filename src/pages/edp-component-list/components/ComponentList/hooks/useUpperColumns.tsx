import { Icon } from '@iconify/react';
import { Box, Button, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import React from 'react';
import { TableColumn } from '../../../../../components/Table/types';
import { ICONS } from '../../../../../icons/iconify-icons-mapping';
import { EDPCodebaseKubeObjectInterface } from '../../../../../k8s/EDPCodebase/types';

export const useUpperColumns = ({
  selected,
  onUninstallClick,
}: {
  selected: string[];
  onUninstallClick: () => void;
}): TableColumn<EDPCodebaseKubeObjectInterface>[] => {
  const theme = useTheme();
  const numSelected = React.useMemo(() => selected.length, [selected]);

  return React.useMemo(
    () => [
      {
        id: 'selected',
        label: '',
        render: () => {
          return (
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box sx={{ minWidth: theme.typography.pxToRem(150) }}>
                {numSelected > 0 ? (
                  <Typography variant={'body1'}>{numSelected} item(s) selected</Typography>
                ) : null}
              </Box>
              <Tooltip title={'Delete selected components'}>
                <div>
                  <Button
                    onClick={onUninstallClick}
                    disabled={!numSelected}
                    size="medium"
                    sx={{ color: theme.palette.secondary.dark }}
                    startIcon={<Icon icon={ICONS.BUCKET} />}
                  >
                    delete
                  </Button>
                </div>
              </Tooltip>
            </Stack>
          );
        },
        colSpan: 4,
      },
      {
        id: 'placeholder-1',
        label: '',
        render: () => null,
      },
      {
        id: 'placeholder-2',
        label: '',
        render: () => null,
      },
      {
        id: 'placeholder-3',
        label: '',
        render: () => null,
      },
      {
        id: 'placeholder-4',
        label: '',
        render: () => null,
      },
    ],
    [numSelected, onUninstallClick, theme]
  );
};
