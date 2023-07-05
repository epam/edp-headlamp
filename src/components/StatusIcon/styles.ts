import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
    icon: {
        willChange: 'transform',
        display: 'block',
        lineHeight: 0,
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
