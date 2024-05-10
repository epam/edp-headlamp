import makeStyles from '@mui/styles/makeStyles';
import { rem } from '../../utils/styling/rem';

export const useStyles = makeStyles((theme) => ({
  tabs: {
    borderRadius: rem(5),
  },
  disabledTab: {
    backgroundColor: theme.palette.action.disabled,
  },
}));
