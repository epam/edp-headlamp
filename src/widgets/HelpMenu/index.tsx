import { Icon } from '@iconify/react';
import {
  IconButton,
  Link,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import React from 'react';
import { HELP_MENU_LIST } from './menu';

export const HelpMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Community">
        <IconButton onClick={handleClick} size="large">
          <Icon icon={'material-symbols:info'} />
        </IconButton>
      </Tooltip>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {HELP_MENU_LIST.map(({ id, url, icon, label }) => {
          return (
            <MenuItem key={id} component={Link} href={url} target={'_blank'} onClick={handleClose}>
              <ListItemIcon>
                <Icon icon={icon} width={20} height={20} />
              </ListItemIcon>
              <ListItemText>{label}</ListItemText>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};
