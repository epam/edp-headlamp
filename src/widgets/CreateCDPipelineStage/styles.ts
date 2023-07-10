import { makeStyles } from '@material-ui/core';
import { rem } from '../../utils/styling/rem';

export const useStyles = makeStyles(() => ({
    dialogRoot: {
        '& .MuiDialog-paper': {
            height: '100%',
        },
    },
    dialog: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    dialogTitle: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: rem(30),
        padding: `${rem(16)} ${rem(24)}`,
    },
    dialogContent: {
        padding: 0,
        overflow: 'hidden',
        display: 'flex',
    },
}));
