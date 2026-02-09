import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme: DefaultTheme) => ({
  radioGroup: {
    gap: theme.typography.pxToRem(24),
    minHeight: theme.typography.pxToRem(150),
  },
  radioControlButton: {
    display: 'block',
    width: '100%',
    height: '100%',
    padding: 0,
    borderRadius: theme.typography.pxToRem(4),
    border: '1px solid transparent',
    backgroundColor: 'transparent',
    transition: 'background-color 300ms ease, border 300ms ease',
    boxShadow: '0px 1px 10px 0px #0024461F',

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
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: 0,
    gap: theme.typography.pxToRem(20),
    padding: `${theme.typography.pxToRem(24)}`,
    width: '100%',
    height: '100%',

    '& .MuiButtonBase-root': {
      color: '#000',
    },

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
