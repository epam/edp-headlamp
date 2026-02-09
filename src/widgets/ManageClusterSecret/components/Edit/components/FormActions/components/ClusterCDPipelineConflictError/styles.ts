import makeStyles from '@mui/styles/makeStyles';
import { rem } from '../../../../../../../../utils/styling/rem';

export const useStyles = makeStyles((theme: DefaultTheme) => ({
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  conflictEntityName: {
    backgroundColor: theme.palette.action.selected,
    padding: `${rem(2)} ${rem(15)}`,
    margin: `0 ${rem(5)}`,
    borderRadius: rem(5),
  },
}));
