import { Icon } from '@iconify/react';
import {
    ButtonGroup,
    ClickAwayListener,
    Grow,
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuList,
    Paper,
    Popper,
    Stack,
    useTheme,
} from '@mui/material';
import React from 'react';
import { ActionsInlineList } from '../../../../components/ActionsInlineList';
import { ButtonWithPermission } from '../../../../components/ButtonWithPermission';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { CustomActionsInlineListProps } from './types';

export const CustomActionsInlineList = ({
  permissions,
  groupActions,
  inlineActions,
}: CustomActionsInlineListProps) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  const groupActionsWithoutFirstItem = groupActions.slice(1);
  const theme = useTheme();

  return (
    <>
      <Stack spacing={1} direction="row" alignItems="center">
        <ButtonGroup variant="outlined" ref={anchorRef}>
          <ButtonWithPermission
            ButtonProps={{
              startIcon: <Icon icon={groupActions[0].icon} width={25} height={25} />,
              onClick: groupActions[0].action,
              sx: {
                color: theme.palette.secondary.dark,
                borderColor: theme.palette.secondary.dark,
              },
            }}
            disabled={!permissions.create.PipelineRun.allowed}
            reason={permissions.create.PipelineRun.reason}
          >
            {groupActions[0].label}
          </ButtonWithPermission>
          <ButtonWithPermission
            ButtonProps={{
              size: 'small',
              onClick: handleToggle,
              sx: {
                height: '100%',
                color: theme.palette.secondary.dark,
                borderColor: theme.palette.secondary.dark,
              },
            }}
            disabled={!permissions.create.PipelineRun.allowed}
            reason={permissions.create.PipelineRun.reason}
          >
            <Icon
              icon={ICONS.ARROW_DROPDOWN}
              color={theme.palette.secondary.dark}
              width={25}
              height={25}
            />
          </ButtonWithPermission>
        </ButtonGroup>
        <ActionsInlineList actions={inlineActions} />
      </Stack>

      <Popper
        sx={{ zIndex: 1 }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem>
                  {groupActionsWithoutFirstItem.map((option) => (
                    <MenuItem key={option.label} onClick={option.action}>
                      <ListItemIcon>
                        <Icon icon={option.icon} width={25} height={25} />
                      </ListItemIcon>
                      <ListItemText>{option.label}</ListItemText>
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};
