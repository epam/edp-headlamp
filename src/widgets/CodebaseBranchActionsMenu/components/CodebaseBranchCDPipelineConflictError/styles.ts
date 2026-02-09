import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme: DefaultTheme) => ({
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  conflictEntityName: {
    backgroundColor: theme.palette.action.selected,
    padding: `${theme.typography.pxToRem(2)} ${theme.typography.pxToRem(15)}`,
    margin: `0 ${theme.typography.pxToRem(5)}`,
    borderRadius: theme.typography.pxToRem(5),
  },
}));
