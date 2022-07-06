import { rem } from '../../../../utils/styling/rem';

const {
    pluginLib: { MuiCore },
} = globalThis;
const { makeStyles } = MuiCore;

export const useStyles = makeStyles(() => ({
    tableHeaderActions: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: rem(20),
        alignItems: 'center',
        paddingRight: rem(20),
    },
    stageHeading: {
        display: 'flex',
        alignItems: 'center',
        gap: rem(20),
        lineHeight: 0,
    },
}));
