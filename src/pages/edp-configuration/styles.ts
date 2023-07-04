import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
    sectionRoot: {
        '& > .MuiPaper-root': {
            boxShadow: 'none',
            backgroundColor: 'transparent',
        },
    },
}));
