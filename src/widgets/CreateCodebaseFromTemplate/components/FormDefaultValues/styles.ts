import { makeStyles } from '@material-ui/core';
import { rem } from '../../../../utils/styling/rem';

export const useStyles = makeStyles(() => ({
    defaultValuesBoard: {
        padding: rem(10),
        border: '1px solid rgba(0,0,0,0.1)',
        marginBottom: rem(20),
        backgroundColor: 'rgba(0,0,0,0.03)',
    },
}));
