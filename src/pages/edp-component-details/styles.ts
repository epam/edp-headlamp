import { makeStyles } from '@material-ui/core';
import { rem } from '../../utils/styling/rem';

export const useStyles = makeStyles(() => ({
    pageHeading: {
        display: 'flex',
        gap: rem(20),
        alignItems: 'center',
        paddingRight: rem(20),
    },
}));
