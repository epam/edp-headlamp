import { Icon } from '@iconify/react';
import { Router } from '@kinvolk/headlamp-plugin/lib';
import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Box, Drawer, Grid, Stack, Tab, Tabs, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useStyles } from './styles';
import { PageWithSubMenuProps } from './types';

export const PageWithSubMenu: React.FC<PageWithSubMenuProps> = ({ title, list, children }) => {
  const classes = useStyles();
  const location = useLocation();
  const theme = useTheme();
  const history = useHistory();

  const [activeGroupTabId, setActiveGroupTabId] = React.useState<string>(() => {
    const activeItem = list.find((el) =>
      el.children.some((child) => location.pathname.includes(child.routePath))
    );

    return activeItem ? activeItem.id : list[0].id;
  });

  const handleChangeGroupTab = React.useCallback(
    (event: React.ChangeEvent<{}>, newActiveTabId: string) => {
      setActiveGroupTabId(newActiveTabId);
      const newActiveMenuItem = list.find((el) => el.id === newActiveTabId)!;
      const newActiveChild = newActiveMenuItem.children[0];
      const newRoute = Router.createRouteURL(newActiveChild?.routePath);
      history.push(newRoute);
    },
    [history, list]
  );

  const activeGroupItem = list.find((el) => el.id === activeGroupTabId)!;

  const [activeTabId, setActiveTabId] = React.useState<string>(() => {
    const activeItem = activeGroupItem.children.find((el) =>
      location.pathname.includes(el.routePath)
    )!;
    return activeItem.id || activeGroupItem.children[0].id;
  });

  const handleChangeTab = React.useCallback(
    (event: React.ChangeEvent<{}>, newActiveTabId: string) => {
      setActiveTabId(newActiveTabId);
    },
    []
  );

  return (
    <Box sx={{ px: theme.typography.pxToRem(16), mt: theme.typography.pxToRem(40) }}>
      <Stack spacing={3}>
        <Typography color="primary.dark" fontSize={theme.typography.pxToRem(48)}>
          {title}
        </Typography>
        <div className={classes.subMenuAndContentWrapper}>
          <div className={classes.subMenuWrapper}>
            <Drawer variant="permanent" className={classes.subMenu}>
              <div style={{ paddingBottom: theme.typography.pxToRem(20) }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} className={classes.subMenuGroup}>
                    <Tabs
                      value={activeGroupTabId}
                      onChange={handleChangeGroupTab}
                      indicatorColor={'primary'}
                      textColor={'primary'}
                      variant="scrollable"
                      orientation="vertical"
                      scrollButtons="auto"
                      TabIndicatorProps={{
                        sx: {
                          transition: 'none',
                        },
                      }}
                      sx={{
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          bottom: 0,
                          width: theme.typography.pxToRem(2),
                          backgroundColor: theme.palette.secondary.main,
                        },
                      }}
                    >
                      {list.map((el) => (
                        <Tab
                          label={el.label}
                          icon={<Icon icon={el.icon} width={24} height={24} color={'inherit'} />}
                          value={el.id}
                          sx={{
                            minHeight: 'auto',
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            textAlign: 'left',
                            gap: theme.typography.pxToRem(10),
                            padding: `${theme.typography.pxToRem(9)} ${theme.typography.pxToRem(
                              16
                            )}`,
                            color: theme.palette.secondary.dark,
                            '& .MuiTab-iconWrapper': { m: '0 !important' },
                          }}
                        />
                      ))}
                    </Tabs>
                  </Grid>
                </Grid>
              </div>
            </Drawer>
          </div>
          <div className={classes.contentWrapper}>
            <Box sx={{ pl: theme.typography.pxToRem(16) }}>
              <Tabs
                value={activeTabId}
                onChange={handleChangeTab}
                indicatorColor={'primary'}
                textColor={'primary'}
                variant="scrollable"
                orientation="horizontal"
                scrollButtons="auto"
              >
                {activeGroupItem.children.map((el) => {
                  return (
                    <Tab
                      component={Link}
                      routeName={el.routePath}
                      label={el.label}
                      value={el.id}
                      sx={{
                        minHeight: 'auto',
                        flexDirection: 'row',
                        gap: theme.typography.pxToRem(10),
                        padding: theme.typography.pxToRem(16),
                        textDecoration: 'none !important',
                        '& .MuiTab-iconWrapper': { m: '0 !important' },
                      }}
                    />
                  );
                })}
              </Tabs>
            </Box>
            {children}
          </div>
        </div>
      </Stack>
    </Box>
  );
};
