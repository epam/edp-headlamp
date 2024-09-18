import { Icon } from '@iconify/react';
import { Box, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import React from 'react';
import { ButtonWithPermission } from '../../../../../components/ButtonWithPermission';
import { ConditionalWrapper } from '../../../../../components/ConditionalWrapper';
import { TableColumn } from '../../../../../components/Table/types';
import { ICONS } from '../../../../../icons/iconify-icons-mapping';
import { CodebaseKubeObjectInterface } from '../../../../../k8s/groups/EDP/Codebase/types';
import { PermissionsConfig } from '../../../../../providers/Permissions/types';
import { permissionsToCheckConfig } from '../../../constants';

export const useUpperColumns = ({
  selected,
  onUninstallClick,
  permissions,
}: {
  selected: string[];
  onUninstallClick: () => void;
  permissions: PermissionsConfig<typeof permissionsToCheckConfig>;
}): TableColumn<CodebaseKubeObjectInterface>[] => {
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
            condition={permissions.delete.Codebase.allowed}
            wrapper={(children) => (
              <Tooltip title={'Delete selected components'}>
                <div>{children}</div>
              </Tooltip>
            )}
          >
            <ButtonWithPermission
              ButtonProps={{
                disabled: !numSelected,
                onClick: onUninstallClick,
                size: 'medium',
                startIcon: <Icon icon={ICONS.BUCKET} />,
                sx: { color: theme.palette.secondary.dark },
              }}
              disabled={!permissions.delete.Codebase.allowed}
              reason={permissions.delete.Codebase.reason}
            >
              delete
            </ButtonWithPermission>
          </ConditionalWrapper>
        ),
      },
    ],
    [
      numSelected,
      onUninstallClick,
      permissions.delete.Codebase.allowed,
      permissions.delete.Codebase.reason,
      theme.palette.secondary.dark,
      theme.typography,
    ]
  );
};
