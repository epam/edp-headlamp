import { MuiCore } from '../../../../../../plugin.globals';
import { rem } from '../../../../../../utils/styling/rem';

const { makeStyles } = MuiCore;

export const useStyles = makeStyles(() => ({
    tableItemTitle: {
        marginBottom: rem(12),
    },
    tableItemInner: {
        padding: rem(12),
    },
}));
