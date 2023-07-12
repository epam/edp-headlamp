import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
    cardRoot: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardRootActive: {
        backgroundColor: theme.palette.action.selected,
    },
    cardActions: {
        marginTop: 'auto',
    },
}));
