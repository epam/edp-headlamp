import { rem } from '../../utils/styling/rem';

const {
    pluginLib: { MuiCore },
} = globalThis;
const { makeStyles } = MuiCore;

export const useStyles = makeStyles(() => ({
    pageHeading: {
        display: 'flex',
        gap: rem(20),
        alignItems: 'center',
        paddingRight: rem(20),
    },
}));
