import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  dialogContent: {
    display: 'flex',
    flexWrap: 'nowrap',
    gap: theme.typography.pxToRem(20),
    padding: theme.typography.pxToRem(24),
  },
  dialogContentForm: {
    flexGrow: 1,
  },
}));
