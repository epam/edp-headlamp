import { MuiCore } from '../../plugin.globals';
import { rem } from '../../utils/styling/rem';

const { makeStyles } = MuiCore;

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
