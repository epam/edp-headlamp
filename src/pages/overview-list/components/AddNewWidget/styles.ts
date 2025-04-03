import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  cardRoot: {
    height: '100%',
    minHeight: theme.typography.pxToRem(209),
    width: '100%',
    borderRadius: '4px',
    border: `1px solid #D1D1FF`,
    color: theme.palette.primary.dark,
  },
}));
