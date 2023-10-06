import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
    dialog: {
        '& .MuiDialog-paper': {
            minHeight: '50vh',
        },
    },
    dialogContent: {
        display: 'flex',
        alignItems: 'center',
    },
}));
