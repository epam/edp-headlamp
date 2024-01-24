import { alpha, darken } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { rem } from '../../../../../../utils/styling/rem';

export const useStyles = makeStyles((theme) => ({
  cardRoot: {
    height: '100%',
    position: 'relative',

    '&:hover $cardBack': {
      opacity: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  cardContent: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: rem(16),
    backgroundColor: theme.palette.squareButton.background,

    '&:last-child': {
      paddingBottom: rem(16),
    },
  },
  cardBack: {
    padding: rem(5),
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    opacity: 0,
    backgroundColor: alpha(darken(theme.palette.squareButton.background, 0.25), 0.8),
    transition: 'opacity 300ms ease, pointer-events 500ms ease',
    display: 'none',
  },
  cardTitle: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  serviceItemIcon: {
    display: 'block',
    width: rem(50),
    height: rem(50),

    '& img': {
      width: '100%',
      height: '100%',
    },
  },
}));
