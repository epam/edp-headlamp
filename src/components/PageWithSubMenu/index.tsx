import { Icon } from '@iconify/react';
import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import {
    Drawer,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme,
} from '@material-ui/core';
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
                    {list.map(({ icon, label, routePath }) => {
                        const isSelected = pathname.includes(routePath);

                        return (
                            <ListItem
                                component={Link}
                                button
                                selected={isSelected}
                                routeName={routePath}
                                icon
                            >
                                <ListItemIcon>
                                    <Icon icon={icon} width={20} height={20} />
                                </ListItemIcon>
                                <ListItemText style={{ margin: 0 }}>
                                    <Typography
                                        variant={'body2'}
                                        style={{ color: theme.palette.text.primary }}
                                    >
                                        {label}
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                        );
                    })}
                </Drawer>
            </div>
            <div className={classes.contentWrapper}>{children}</div>
        </div>
    );
};
