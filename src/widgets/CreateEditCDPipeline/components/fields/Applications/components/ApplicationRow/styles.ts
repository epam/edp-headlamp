import makeStyles from '@mui/styles/makeStyles';
import { rem } from '../../../../../../../utils/styling/rem';

export const useStyles = makeStyles(() => ({
  application: {
    '& .MuiFormControlLabel-root': {
      margin: 0,
    },
    '& .MuiCheckbox-root': {
      padding: rem(4),
    },
  },
}));
