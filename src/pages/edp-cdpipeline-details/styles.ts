import { MuiCore } from '../../plugin.globals';
import { rem } from '../../utils/styling/rem';

const { makeStyles } = MuiCore;

export const useStyles = makeStyles(() => ({
    pageHeading: {
        display: 'flex',
        gap: rem(20),
        alignItems: 'center',
        paddingRight: rem(20),
    },
    tableHeaderActions: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: rem(20),
        alignItems: 'center',
        paddingRight: rem(20),
    },
}));
