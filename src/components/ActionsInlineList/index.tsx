import { Icon } from '@iconify/react';
import { Button, IconButton, Stack, Tooltip, useTheme } from '@mui/material';
import React from 'react';
import { ActionsInlineListProps } from './types';

export const ActionsInlineList = ({ actions }: ActionsInlineListProps) => {
  const theme = useTheme();

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      {actions.map(({ name, action, disabled, icon, label, isTextButton }, idx) => {
        const actionId = `${name}:${idx}`;

        return isTextButton ? (
          <Button
            size="small"
            onClick={action}
            variant="outlined"
            disabled={disabled?.status}
            endIcon={icon && <Icon icon={icon} color={theme.palette.secondary.dark} width="16" />}
            sx={{ color: theme.palette.secondary.dark, borderColor: theme.palette.secondary.dark }}
          >
            {name}
          </Button>
        ) : (
          <div key={actionId}>
            <Tooltip title={disabled?.reason || label}>
              <div>
                <IconButton
                  component="span"
                  disabled={disabled?.status}
                  onClick={action}
                  size="medium"
                  sx={{ color: theme.palette.secondary.dark }}
                >
                  {icon && <Icon icon={icon} width={24} height={24} />}
                </IconButton>
              </div>
            </Tooltip>
          </div>
        );
      })}
    </Stack>
  );
};
