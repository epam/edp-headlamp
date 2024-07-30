import makeStyles from '@mui/styles/makeStyles';
import { rem } from '../../../../../../utils/styling/rem';

export const useStyles = makeStyles((theme) => ({
  cardRoot: {
    height: theme.typography.pxToRem(64),
    position: 'relative',
    padding: `${theme.typography.pxToRem(15)} ${theme.typography.pxToRem(16)}`,
    boxShadow: '0px 1px 10px 0px #0024461F',
    borderRadius: '4px',
  },
  cardTitle: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  serviceItemIcon: {
    flexShrink: 0,
    display: 'block',
    width: rem(32),
    height: rem(32),

    '& img': {
      width: '100%',
      height: '100%',
    },
  },
}));
