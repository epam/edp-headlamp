import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(() => ({
  tabPanel: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',

    '&[hidden]': {
      height: 0,
      overflow: 'hidden',
    },
  },
}));
