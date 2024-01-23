import makeStyles from '@mui/styles/makeStyles';
import { rem } from '../../../../utils/styling/rem';

export const useStyles = makeStyles(() => ({
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
