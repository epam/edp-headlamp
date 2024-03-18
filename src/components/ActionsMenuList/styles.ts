import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',

    '& .MuiTooltip-popper': {
      pointerEvents: 'auto',
    },
  },
  actionList: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.typography.pxToRem(5),
    overflow: 'hidden',
    padding: `${theme.typography.pxToRem(8)} 0`,
  },
  popper: {
    zIndex: 5,
    cursor: 'default',
    padding: 0,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxShadow: '0px 5px 5px -3px #00000033, 0px 8px 10px 1px #00000024, 0px 3px 14px 2px #0000001F',
    borderRadius: theme.typography.pxToRem(5),
  },
  childrenWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
}));
