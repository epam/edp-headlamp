import { Icon } from '@iconify/react';
import {
  ClickAwayListener,
  ListItem,
  ListItemIcon,
  ListItemText,
  Popper,
  Tooltip,
} from '@mui/material';
import React from 'react';
import { KubeObjectAction } from '../../types/actions';
import { ConditionalWrapper } from '../ConditionalWrapper';
import { useStyles } from './styles';
import { KubeObjectActionsProps } from './types';

type ActionsListProps = {
  actions: KubeObjectAction[];
  menuOpen: boolean;
  anchorEl: HTMLElement | null;
};

const ActionsList = ({ actions, menuOpen, anchorEl }: ActionsListProps) => {
  const classes = useStyles();

  return anchorEl ? (
    <Popper
      open={menuOpen}
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
                wrapper={children => <Tooltip title={disabled.reason}>{children}</Tooltip>}
              >
                <ListItem button disabled={disabled.status} onClick={action}>
                  <ListItemIcon>
                    <Icon icon={icon} width={'25'} />
                  </ListItemIcon>
                  <ListItemText primary={label} />
                </ListItem>
              </ConditionalWrapper>
            </div>
          );
        })}
      </div>
    </Popper>
  ) : null;
};

export const KubeObjectActions = ({
  actions = [],
  anchorEl,
  handleCloseActionsMenu,
}: KubeObjectActionsProps) => {
  const classes = useStyles();

  return !!actions.length ? (
    <ClickAwayListener
      onClickAway={handleCloseActionsMenu}
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
    >
      <div className={classes.actions}>
        <ActionsList actions={actions} menuOpen={Boolean(anchorEl)} anchorEl={anchorEl} />
      </div>
    </ClickAwayListener>
  ) : null;
};
