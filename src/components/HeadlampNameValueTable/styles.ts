import { makeStyles } from '@material-ui/core';
import { rem } from '../../utils/styling/rem';

export const useStyles = makeStyles(() => ({
    tableWrapper: {
        '& dt, dd': {
            lineHeight: '1.5',
            fontSize: rem(14),
            padding: `${rem(8)} ${rem(2)}`,
            verticalAlign: 'middle',
            minWidth: 0,
        },
    },
}));
