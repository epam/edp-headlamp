import makeStyles from '@mui/styles/makeStyles';
import { rem } from '../../../../utils/styling/rem';

export const useStyles = makeStyles((theme: DefaultTheme) => ({
  radioGroup: {
    gap: rem(10),
  },
  radioControlButton: {
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
    margin: 0,
    gap: rem(10),
    padding: `${rem(5)} ${rem(8)}`,

    '& .MuiRadio-root': {
      padding: 0,
      position: 'static',

      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
  },
  radioControlLabelDisabled: {
    '& .MuiFormControlLabel-label': {
      color: theme.palette.text.disabled,
    },
  },
}));
