import { RootState } from '@kinvolk/headlamp-plugin/lib/redux/stores/store';
import { makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import React from 'react';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { rem } from '../../utils/styling/rem';

const headerHeight = 64;
const tabMenuHeight = 65;
const sidebarOpenWidth = 240;
const sidebarClosedWidth = 73;

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useStyles = () => {
    const theme = useTheme();
    const sidebar = useTypedSelector(state => state.ui.sidebar);
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
    const isSmallSideBar = useMediaQuery(theme.breakpoints.only('sm'));

    const subMenuExtraHeight = React.useMemo(() => {
        if (!(!isSmallSideBar && (sidebar.isSidebarOpen || isMobile))) {
            return headerHeight + tabMenuHeight;
        } else {
            return headerHeight;
        }
    }, [isMobile, isSmallSideBar, sidebar.isSidebarOpen]);

    const subMenuLeftOffset = React.useMemo(() => {
        if (sidebar.isSidebarOpen) {
            return sidebarOpenWidth;
        } else {
            return sidebarClosedWidth;
        }
    }, [sidebar.isSidebarOpen]);

    return makeStyles(() => ({
        subMenu: {
            '& .MuiDrawer-paper': {
                left: rem(subMenuLeftOffset),
                top: rem(subMenuExtraHeight),
                bottom: 0,
                minWidth: rem(sidebarOpenWidth),
                padding: `${rem(30)} ${rem(20)}`,
                transition: theme.transitions.create('left', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
        subMenuAndContentWrapper: {
            display: 'flex',
            flexWrap: 'nowrap',
            gap: rem(20),
        },
        subMenuWrapper: {
            width: rem(sidebarOpenWidth),
            flexShrink: 0,
        },
        contentWrapper: {
            flexGrow: 1,
            paddingTop: rem(30),
        },
    }))();
};
