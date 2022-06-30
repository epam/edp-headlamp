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
    },
    icon: {
        willChange: 'transform',
    },
    rotateIcon: {
        animation: '$spin 2s linear infinite',
    },
    '@keyframes spin': {
        '0%': {
            transform: 'rotate(360deg)',
        },
        '100%': {
            transform: 'rotate(0deg)',
        },
    },
}));
