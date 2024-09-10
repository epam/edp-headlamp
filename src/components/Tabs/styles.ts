import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  tabs: {
    borderRadius: theme.typography.pxToRem(5),
  },
  disabledTab: {
    backgroundColor: theme.palette.action.disabled,
  },
  tabWithHighlightDot: {
    position: 'relative',

    '&::after': {
      content: '""',
      position: 'absolute',
      top: theme.typography.pxToRem(-4),
      right: theme.typography.pxToRem(-10),
      width: theme.typography.pxToRem(6),
      height: theme.typography.pxToRem(6),
      borderRadius: '50%',
      backgroundColor: theme.palette.primary.main,
    },
  },
}));
