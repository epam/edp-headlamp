import makeStyles from '@mui/styles/makeStyles';
import { rem } from '../../utils/styling/rem';

export const useStyles = makeStyles(() => {
  return {
    wrapper: {
      width: '100%',
    },
    img: {
      height: rem(24),
      objectFit: 'contain',
      display: 'block',
      marginLeft: 'auto',
    },
  };
});
