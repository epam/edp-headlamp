import { makeStyles } from '@material-ui/core';
import { rem } from '../../utils/styling/rem';

export const useStyles = (width, height) =>
    makeStyles(() => ({
        icon: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 'auto',
            width: rem(width),
            height: rem(height),

            '& img': {
                width: '100%',
                height: '100%',
            },
        },
    }))();
