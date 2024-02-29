import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  cardRoot: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: theme.palette.action.selected,
    borderRadius: '4px',
  },
}));
