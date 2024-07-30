import { Icon } from '@iconify/react';
import { Box, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import React from 'react';
import { ButtonWithPermission } from '../../../components/ButtonWithPermission';
import { ConditionalWrapper } from '../../../components/ConditionalWrapper';
import { TableColumn } from '../../../components/Table/types';
import { ICONS } from '../../../icons/iconify-icons-mapping';
import { PipelineRunKubeObjectInterface } from '../../../k8s/groups/Tekton/PipelineRun/types';
import { PermissionSet } from '../../../types/permissions';

export const useUpperColumns = ({
  selected,
  onDeleteClick,
  permissions,
}: {
  selected: string[];
  onDeleteClick: () => void;
  permissions: PermissionSet;
}): TableColumn<PipelineRunKubeObjectInterface>[] => {
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
                <Typography variant={'body1'}>{numSelected} item(s) selected</Typography>
              </Box>
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
        render: () => (
          <ConditionalWrapper
            condition={permissions.delete}
            wrapper={(children) => (
              <Tooltip title={'Delete selected PipelineRuns'}>
                <div>{children}</div>
              </Tooltip>
            )}
          >
            <ButtonWithPermission
              ButtonProps={{
                size: 'medium',
                startIcon: <Icon icon={ICONS.BUCKET} />,
                onClick: onDeleteClick,
                disabled: !numSelected,
                sx: { color: theme.palette.secondary.dark },
              }}
              text="You do not have permission to delete PipelineRun"
              allowed={permissions.delete}
            >
              delete
            </ButtonWithPermission>
          </ConditionalWrapper>
        ),
      },
    ],
    [numSelected, onDeleteClick, permissions.delete, theme.palette.secondary.dark, theme.typography]
  );
};
