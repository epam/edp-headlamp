import { Icon } from '@iconify/react';
import {
  ClickAwayListener,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popper,
  Tooltip,
} from '@mui/material';
import React from 'react';
import { ConditionalWrapper } from '../ConditionalWrapper';
import { useStyles } from './styles';
import { ActionsMenuListProps } from './types';

export const ActionsMenuList = ({
  actions,
  anchorEl,
  handleCloseActionsMenu,
}: ActionsMenuListProps) => {
  const classes = useStyles();

  return (
    <ClickAwayListener
      onClickAway={handleCloseActionsMenu}
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
    >
      <div className={classes.actions}>
        {anchorEl ? (
          <Popper
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            disablePortal
            className={classes.popper}
            placement={'bottom-end'}
          >
            <div role="list" className={classes.actionList}>
              {actions.map(({ name, label, action, disabled, icon }, idx) => {
                const actionId = `${name}:${idx}`;

                return (
                  <div key={actionId}>
                    <ConditionalWrapper
                      condition={disabled.status}
                      wrapper={(children) => (
                        <Tooltip title={disabled.reason}>
                          <div>{children}</div>
                        </Tooltip>
                      )}
                    >
                      <ListItemButton disabled={disabled.status} onClick={action}>
                        <ListItemIcon>
                          <Icon icon={icon} width={'25'} />
                        </ListItemIcon>
                        <ListItemText primary={label} />
                      </ListItemButton>
                    </ConditionalWrapper>
                  </div>
                );
              })}
            </div>
          </Popper>
        ) : null}
      </div>
    </ClickAwayListener>
  );
};
