import { MuiCore } from '../../../../plugin.globals';
import { rem } from '../../../../utils/styling/rem';

const { makeStyles } = MuiCore;

export const useStyles = makeStyles(() => ({
    tableItemTitle: {
        marginBottom: rem(12),
    },
    tableItemInner: {
        padding: rem(12),
    },
    stageHeading: {
        display: 'flex',
        alignItems: 'center',
        gap: rem(20),
        lineHeight: 0,
        width: '100%',
    },
    accordionSummary: {
        padding: `0 ${rem(26)}`,
    },
}));
