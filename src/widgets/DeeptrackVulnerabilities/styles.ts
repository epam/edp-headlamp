import { makeStyles } from '@material-ui/core';
import { rem } from '../../utils/styling/rem';

export const useStyles = makeStyles(() => {
    return {
        wrapper: {
            width: '100%',
        },
        img: {
            height: rem(24),
            objectFit: 'contain',
            display: 'block',
            marginLeft: 'auto',
        },
    };
});
