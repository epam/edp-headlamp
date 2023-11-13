import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
    value: {
        fontSize: '1.5rem',
        fontWeight: theme.typography.fontWeightMedium as number,
    },
}));
