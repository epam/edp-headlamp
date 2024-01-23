import makeStyles from '@mui/styles/makeStyles';
import { rem } from '../../../../utils/styling/rem';

export const useStyles = makeStyles(() => ({
  tableRoot: {
    '& .MuiTableCell-root': {
      fontSize: '1rem',

      '&:nth-child(1)': {
        width: rem(100),
      },

      '&:nth-child(2)': {
        width: rem(300),
      },

      '&:last-child': {
        width: rem(150),
      },
    },
  },
}));
