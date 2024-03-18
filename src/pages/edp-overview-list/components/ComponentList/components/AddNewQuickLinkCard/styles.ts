import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  cardRoot: {
    height: theme.typography.pxToRem(64),
    width: '100%',
    borderRadius: '4px',
    border: `1px solid #D1D1FF`,
    color: theme.palette.primary.dark,
  },
}));
