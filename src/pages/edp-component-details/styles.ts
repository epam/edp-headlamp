import { makeStyles } from '@material-ui/core';
import { rem } from '../../utils/styling/rem';

export const useStyles = makeStyles(() => ({
    defaultValuesBoard: {
        padding: rem(10),
        border: '1px solid rgba(0,0,0,0.1)',
        margin: `${rem(20)} 0`,
        backgroundColor: 'rgba(0,0,0,0.03)',
    },
    labelChip: {
        height: rem(20),
        lineHeight: 1,
        paddingTop: rem(2),
    },
    labelChipBlue: {
        backgroundColor: '#cbe1f9',
        color: '#1261af',
    },
    labelChipGreen: {
        backgroundColor: '#c3e6cd',
        color: '#2f6f45',
    },
}));
