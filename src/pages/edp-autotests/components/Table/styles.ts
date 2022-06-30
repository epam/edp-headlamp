const {
    pluginLib: { MuiCore },
} = globalThis;
const { makeStyles } = MuiCore;

export const getStyles = makeStyles(() => {
    return {
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
    };
});
