import makeStyles from '@mui/styles/makeStyles';
import { rem } from '../../utils/styling/rem';

const headerHeight = 64;
const contentTopOffsetHeight = 30;
const iconWidth = 30;

export const useStyles = () => {
  return makeStyles(() => ({
    subMenu: {
      '& .MuiDrawer-paper': {
        position: 'initial',
        overflowX: 'hidden',
        overflowY: 'auto',
        maxHeight: `calc(100vh - ${rem(headerHeight + contentTopOffsetHeight)})`,
      },
    },
    subMenuAndContentWrapper: {
      display: 'flex',
      flexWrap: 'nowrap',
      gap: rem(20),
      paddingTop: rem(contentTopOffsetHeight),
    },
    subMenuWrapper: {
      flexShrink: 0,
      flexBasis: rem(240),

      '& .MuiDrawer-root': {
        position: 'sticky',
        top: rem(headerHeight + contentTopOffsetHeight),
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
      marginBottom: rem(5),
    },
    listItemRootText: {
      fontWeight: 600,
    },
    listItemIcon: {
      minWidth: rem(iconWidth),
    },
    listItemButton: {
      paddingLeft: rem(iconWidth + 16),
    },
  }))();
};
