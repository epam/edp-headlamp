import { MuiCore } from '../../plugin.globals';
import { rem } from '../../utils/styling/rem';

const { makeStyles } = MuiCore;

export const useStyles = makeStyles(() => ({
    tableWrapper: {
        '& .MuiTableCell-body': {
            lineHeight: '1.5',
        },

        '& .MuiTableCell-root': {
            padding: rem(10),
        },
    },
}));
