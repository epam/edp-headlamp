import { MuiCore } from '../../plugin.globals';
import { rem } from '../../utils/styling/rem';

const { makeStyles } = MuiCore;

export const useStyles = makeStyles(() => ({
    tableHeaderActions: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: rem(20),
        alignItems: 'center',
    },
    stageHeading: {
        display: 'flex',
        alignItems: 'center',
        gap: rem(20),
        lineHeight: 0,
        width: '100%',
    },
}));
