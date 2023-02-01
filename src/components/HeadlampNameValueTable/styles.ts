import { MuiCore } from '../../plugin.globals';
import { rem } from '../../utils/styling/rem';

const { makeStyles } = MuiCore;

export const useStyles = makeStyles(() => ({
    tableWrapper: {
        '& .MuiTableCell-body': {
            lineHeight: '1.5',
            fontSize: rem(14),
            verticalAlign: 'middle',
        },

        '& .MuiTableCell-root': {
            padding: `${rem(8)} ${rem(2)}`,
        },
    },
}));
