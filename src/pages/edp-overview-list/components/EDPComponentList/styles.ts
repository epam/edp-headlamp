import { makeStyles } from '@material-ui/core';
import { rem } from '../../../../utils/styling/rem';

export const useStyles = makeStyles(() => ({
    serviceItemIcon: {
        display: 'block',
        width: rem(50),
        height: rem(50),

        '& img': {
            width: '100%',
            height: '100%',
        },
    },
}));
