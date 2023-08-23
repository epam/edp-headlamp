import { makeStyles } from '@material-ui/core';
import { rem } from '../../../../utils/styling/rem';

export const useStyles = makeStyles(() => ({
    cardRoot: {
        height: '100%',
    },
    cardContent: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: rem(16),

        '&:last-child': {
            paddingBottom: rem(16),
        },
    },
    cardContentRow: {
        '&:not(:last-child)': {
            marginBottom: rem(15),
        },
    },
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
