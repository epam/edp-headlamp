import { makeStyles } from '@material-ui/core';
import { rem } from '../../utils/styling/rem';

export const useStyles = makeStyles(() => ({
    tableHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: rem(20),
        alignItems: 'center',
    },
    tableHeaderActions: {
        marginTop: rem(20),
    },
    branchHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: rem(20),
        lineHeight: 0,
        width: '100%',
    },
}));
