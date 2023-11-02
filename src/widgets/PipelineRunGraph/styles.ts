import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
    dialog: {
        '& .MuiDialog-paper': {
            height: '100%',
        },
    },
    treeItemTitle: {
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
    },
}));
