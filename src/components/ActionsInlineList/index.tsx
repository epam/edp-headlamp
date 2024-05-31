import { Icon } from '@iconify/react';
import { IconButton, Stack, Tooltip, useTheme } from '@mui/material';
import React from 'react';
import { ActionsInlineListProps } from './types';

export const ActionsInlineList = ({ actions }: ActionsInlineListProps) => {
  const theme = useTheme();

  return (
    <Stack direction="row" spacing={1}>
      {actions.map(({ name, action, disabled, icon, label }, idx) => {
        const actionId = `${name}:${idx}`;

        return (
          <div key={actionId}>
            <Tooltip title={disabled.reason || label}>
              <div>
                <IconButton
                  component="span"
                  disabled={disabled.status}
                  onClick={action}
                  size="medium"
                  sx={{ color: theme.palette.secondary.dark }}
                >
                  <Icon icon={icon} width={24} height={24} />
                </IconButton>
              </div>
            </Tooltip>
          </div>
        );
      })}
    </Stack>
  );
};
