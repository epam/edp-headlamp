import { lighten } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { rem } from '../../utils/styling/rem';

export const useStyles = makeStyles((theme) => {
  return {
    root: {
      padding: rem(10),
      backgroundColor: lighten(theme.palette.background.paper, 0.1),

      '& .bx--cc--marker': {
        fill: 'currentColor !important',
      },
    },
  };
});
