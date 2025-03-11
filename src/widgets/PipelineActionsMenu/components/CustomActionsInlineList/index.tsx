import { Icon } from '@iconify/react';
import { ButtonGroup, Stack, useTheme } from '@mui/material';
import React from 'react';
import { ButtonWithPermission } from '../../../../components/ButtonWithPermission';
import { CustomActionsInlineListProps } from './types';

export const CustomActionsInlineList = ({ permissions, actions }: CustomActionsInlineListProps) => {
  const theme = useTheme();

  return (
    <>
      <Stack spacing={1} direction="row" alignItems="center">
        <ButtonGroup variant="outlined">
          <ButtonWithPermission
            ButtonProps={{
              startIcon: <Icon icon={actions[0].icon} width={15} height={15} />,
              size: 'small',
              onClick: actions[0].action,
              sx: {
                height: '100%',
                color: theme.palette.secondary.dark,
                borderColor: theme.palette.secondary.dark,
              },
            }}
            disabled={!permissions?.create?.PipelineRun.allowed}
            reason={permissions?.create?.PipelineRun.reason}
          >
            {actions[0].label}
          </ButtonWithPermission>
        </ButtonGroup>
      </Stack>
    </>
  );
};
