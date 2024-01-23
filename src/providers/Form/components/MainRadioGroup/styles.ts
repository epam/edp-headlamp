import makeStyles from '@mui/styles/makeStyles';
import { rem } from '../../../../utils/styling/rem';

export const useStyles = makeStyles((theme: DefaultTheme) => ({
  radioGroup: {
    gap: rem(10),
    minHeight: rem(150),
  },
  radioControlButton: {
    display: 'block',
    width: '100%',
    height: '100%',
    padding: 0,
    borderRadius: rem(5),
    border: '1px solid transparent',
    backgroundColor: `${theme.palette.primary.main}10`,
    transition: 'background-color 300ms ease, border 300ms ease',

    '&:hover': {
      backgroundColor: `${theme.palette.primary.main}20`,
    },

    '& .MuiTouchRipple-child': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  radioControlButtonActive: {
    backgroundColor: `${theme.palette.primary.main}10`,
    border: `1px solid ${theme.palette.primary.main}80`,
  },
  radioControlLabel: {
    justifyContent: 'center',
    margin: 0,
    gap: rem(20),
    padding: `${rem(20)} ${rem(10)}`,
    width: '100%',
    height: '100%',

    '& .MuiRadio-root': {
      padding: 0,

      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
    '& .MuiFormControlLabel-label': {
      height: '100%',
    },
  },
}));
