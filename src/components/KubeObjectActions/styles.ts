import { makeStyles } from '@material-ui/core';
import { rem } from '../../utils/styling/rem';

export const useStyles = makeStyles((theme: DefaultTheme) => ({
    actions: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',

        '& .MuiTooltip-popper': {
            pointerEvents: 'auto',
        },

        '& .MuiTooltip-tooltip': {},

        '& .MuiButtonBase-root.Mui-disabled': {
            pointerEvents: 'auto',

            '&:hover': {
                textDecoration: 'auto',
                backgroundColor: 'transparent',
            },
        },
    },
    actionList: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: rem(5),
        overflow: 'hidden',
    },
    popper: {
        zIndex: 5,
        cursor: 'default',
        padding: 0,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow:
            '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
        borderRadius: rem(5),
    },
    childrenWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
}));
