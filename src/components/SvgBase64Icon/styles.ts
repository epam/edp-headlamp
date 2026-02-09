import makeStyles from '@mui/styles/makeStyles';
import { rem } from '../../utils/styling/rem';

export const useStyles = (width: number, height: number) =>
  makeStyles(() => ({
    icon: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 'auto',
      width: rem(width),
      height: rem(height),

      '& img': {
        width: '100%',
        height: '100%',
      },
    },
  }))();
