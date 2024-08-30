import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  application: {
    '& .MuiFormControlLabel-root': {
      margin: 0,
    },
    '& .MuiCheckbox-root': {
      padding: theme.typography.pxToRem(4),
    },
  },
}));
