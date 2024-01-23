import makeStyles from '@mui/styles/makeStyles';
import { rem } from '../../utils/styling/rem';

export const useStyles = makeStyles(() => ({
  tableWrapper: {
    '& .MuiTableCell-body': {
      lineHeight: '1.5',
    },

    '& .MuiTableCell-root': {
      padding: rem(10),
    },
  },
}));
