import makeStyles from '@mui/styles/makeStyles';

const headerHeight = 64;
const contentTopOffsetHeight = 30;
const iconWidth = 30;

export const useStyles = () => {
  return makeStyles((theme) => ({
    subMenu: {
      '& .MuiDrawer-paper': {
        position: 'initial',
        overflowX: 'hidden',
        overflowY: 'auto',
        maxHeight: `calc(100vh - ${theme.typography.pxToRem(
          headerHeight + contentTopOffsetHeight
        )})`,
        backgroundColor: 'transparent',
        borderRight: 'none',
      },
    },
    subMenuAndContentWrapper: {
      display: 'flex',
      flexWrap: 'nowrap',
      gap: theme.typography.pxToRem(20),
    },
    subMenuWrapper: {
      flexShrink: 0,
      flexBasis: theme.typography.pxToRem(240),

      '& .MuiDrawer-root': {
        position: 'sticky',
        top: theme.typography.pxToRem(headerHeight + contentTopOffsetHeight),
      },
    },
    contentWrapper: {
      flexGrow: 1,
    },
    subMenuGroup: {
      borderTop: '1px solid rgba(0, 0, 0, 0.12)',
    },
    listItemRoot: {
      paddingTop: 0,
      paddingBottom: 0,
      marginBottom: theme.typography.pxToRem(5),
      color: theme.palette.secondary.dark,
    },
    listItemRootText: {
      fontWeight: 600,
    },
    listItemIcon: {
      minWidth: theme.typography.pxToRem(iconWidth),
    },
    listItemButton: {
      paddingLeft: theme.typography.pxToRem(iconWidth + 16),
    },
  }))();
};
