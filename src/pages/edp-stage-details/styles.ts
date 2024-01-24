import makeStyles from '@mui/styles/makeStyles';
import { rem } from '../../utils/styling/rem';

export const useStyles = makeStyles((theme) => ({
  tabs: {
    margin: `${rem(20)} 0`,
    boxShadow: theme.shadows[1],
    borderRadius: rem(5),
  },
  disabledTab: {
    backgroundColor: theme.palette.action.disabled,
  },
  tabPanel: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',

    '&[hidden]': {
      height: 0,
      overflow: 'hidden',
    },
  },
  labelChip: {
    height: rem(20),
    lineHeight: 1,
    paddingTop: rem(2),
  },
  labelChipBlue: {
    backgroundColor: '#cbe1f9',
    color: '#1261af',
  },
  labelChipGreen: {
    backgroundColor: '#c3e6cd',
    color: '#2f6f45',
  },
}));
