import makeStyles from '@mui/styles/makeStyles';
import { rem } from '../../../../utils/styling/rem';

export const useStyles = (disabled?: boolean) =>
  makeStyles((theme: DefaultTheme) => ({
    labelWrap: {
      display: 'flex',
      alignItems: 'center',
      gap: rem(7),
      height: '100%',

      '& svg': {
        pointerEvents: 'auto',
        marginBottom: rem(2),
      },
    },
    label: {
      fontSize: rem(14),
      lineHeight: 1,
      color: disabled ? theme.palette.text.disabled : theme.palette.text.primary,
    },
  }))();
