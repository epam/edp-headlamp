import makeStyles from '@mui/styles/makeStyles';
import { rem } from '../../../../../utils/styling/rem';

export const useStyles = makeStyles(() => ({
  dialogContent: {
    display: 'flex',
    flexWrap: 'nowrap',
    gap: rem(20),
    padding: `${rem(8)} ${rem(20)} ${rem(8)} 0`,
  },
  dialogContentTabs: {
    width: '20%',
    flexShrink: 0,
    position: 'sticky',
    top: 0,

    '& .MuiTab-wrapper': {
      alignItems: 'flex-start',
    },
  },
  dialogContentForm: {
    flexGrow: 1,
  },
}));
