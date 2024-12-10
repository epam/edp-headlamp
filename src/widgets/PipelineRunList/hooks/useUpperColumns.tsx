import { Icon } from '@iconify/react';
import { Box, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import React from 'react';
import { ButtonWithPermission } from '../../../components/ButtonWithPermission';
import { ConditionalWrapper } from '../../../components/ConditionalWrapper';
import { TableColumn } from '../../../components/Table/types';
import { ICONS } from '../../../icons/iconify-icons-mapping';
import { PipelineRunKubeObjectInterface } from '../../../k8s/groups/Tekton/PipelineRun/types';
import { WidgetPermissions } from '../types';

export const useUpperColumns = ({
  selected,
  onDeleteClick,
  permissions,
  isEmpty,
}: {
  selected: string[];
  onDeleteClick: () => void;
  permissions: WidgetPermissions;
  isEmpty: boolean;
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
        colSpan: isEmpty ? 7 : 8,
      },
      {
        id: 'placeholder-4',
        label: '',
        render: () => (
          <ConditionalWrapper
            condition={permissions?.delete?.PipelineRun.allowed}
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
              reason={permissions?.delete?.PipelineRun.reason}
              disabled={!permissions?.delete?.PipelineRun.allowed}
            >
              delete
            </ButtonWithPermission>
          </ConditionalWrapper>
        ),
      },
    ],
    [
      isEmpty,
      numSelected,
      onDeleteClick,
      permissions?.delete?.PipelineRun.allowed,
      permissions?.delete?.PipelineRun.reason,
      theme.palette.secondary.dark,
      theme.typography,
    ]
  );
};
