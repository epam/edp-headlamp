import { Icon } from '@iconify/react';
import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import {
  Drawer,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useStyles } from './styles';
import { PageWithSubMenuProps } from './types';

export const PageWithSubMenu: React.FC<PageWithSubMenuProps> = ({ list, children }) => {
  const classes = useStyles();
  const { pathname } = useLocation();
  const theme = useTheme();

  return (
    <div className={classes.subMenuAndContentWrapper}>
      <div className={classes.subMenuWrapper}>
        <Drawer variant="permanent" className={classes.subMenu}>
          <div style={{ paddingBottom: theme.typography.pxToRem(20) }}>
            <Grid container spacing={2}>
              {list.map(({ label, icon, children }) => (
                <Grid item xs={12} key={label} className={classes.subMenuGroup}>
                  {label && (
                    <ListItem className={classes.listItemRoot}>
                      <ListItemIcon className={classes.listItemIcon}>
                        <Icon icon={icon} width={20} height={20} />
                      </ListItemIcon>
                      <ListItemText>
                        <Typography variant={'body1'} className={classes.listItemRootText}>
                          {label}
                        </Typography>
                      </ListItemText>
                    </ListItem>
                  )}
                  {children.map(({ label, routePath }) => {
                    const isSelected = pathname.includes(routePath);

                    return (
                      <ListItem
                        key={label}
                        component={Link}
                        button
                        selected={isSelected}
                        routeName={routePath}
                        className={classes.listItemButton}
                      >
                        <ListItemText style={{ margin: 0 }}>
                          <Typography
                            variant={'body2'}
                            style={{
                              color: theme.palette.text.primary,
                            }}
                          >
                            {label}
                          </Typography>
                        </ListItemText>
                      </ListItem>
                    );
                  })}
                </Grid>
              ))}
            </Grid>
          </div>
        </Drawer>
      </div>
      <div className={classes.contentWrapper}>{children}</div>
    </div>
  );
};
