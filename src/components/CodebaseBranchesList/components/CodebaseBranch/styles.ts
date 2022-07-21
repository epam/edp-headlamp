import { MuiCore } from '../../../../plugin.globals';
import { rem } from '../../../../utils/styling/rem';

const { makeStyles } = MuiCore;

export const useStyles = makeStyles(() => ({
    tablesGrid: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: rem(20),
        width: '100%',
    },
    tablesGridItem: {
        width: '100%',
    },
    tablesGridItemHeading: {
        paddingBottom: rem(12),
    },
    tablesGridItemInner: {
        padding: rem(12),
    },
}));
