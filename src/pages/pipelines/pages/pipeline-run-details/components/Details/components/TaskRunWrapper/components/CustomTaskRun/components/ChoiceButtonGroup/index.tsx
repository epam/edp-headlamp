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
} from '@mui/material';
import React from 'react';
import { ButtonWithPermission } from '../../../../../../../../../../../../components/ButtonWithPermission';
import { ICONS } from '../../../../../../../../../../../../icons/iconify-icons-mapping';
import { useTypedPermissions } from '../../../../../../../../hooks/useTypedPermissions';

export const ChoiceButtonGroup = ({
  options,
  type,
}: {
  options: { id: string; icon: string; label: string; onClick: () => void }[];
  type: 'accept' | 'reject';
}) => {
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

  const optionsWithoutFirstItem = options.slice(1);

  const permissions = useTypedPermissions();

  return (
    <>
      <ButtonGroup variant={type === 'accept' ? 'contained' : 'outlined'} ref={anchorRef}>
        <ButtonWithPermission
          ButtonProps={{
            startIcon: <Icon icon={options[0].icon} width={25} height={25} />,
            onClick: options[0].onClick,
          }}
          disabled={!permissions.update.ApprovalTask.allowed}
          reason={permissions.update.ApprovalTask.reason}
        >
          {options[0].label}
        </ButtonWithPermission>
        <ButtonWithPermission
          ButtonProps={{
            size: 'small',
            onClick: handleToggle,
            sx: { height: '100%' },
          }}
          disabled={!permissions.update.ApprovalTask.allowed}
          reason={permissions.update.ApprovalTask.reason}
        >
          <Icon icon={ICONS.ARROW_DROPDOWN} width={15} height={15} />
        </ButtonWithPermission>
      </ButtonGroup>
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
                  {optionsWithoutFirstItem.map((option) => (
                    <MenuItem key={option.id} onClick={option.onClick}>
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
