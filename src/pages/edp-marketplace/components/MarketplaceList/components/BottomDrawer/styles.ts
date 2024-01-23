import makeStyles from '@mui/styles/makeStyles';
import { rem } from '../../../../../../utils/styling/rem';

export const useStyles = makeStyles(() => ({
  drawerPaper: {
    top: '64px',
    bottom: 0,
    padding: `${rem(20)}`,
    maxWidth: rem(500),
  },
  templateName: {
    display: '-webkit-box',
    '-webkit-line-clamp': 4,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
  },
}));
