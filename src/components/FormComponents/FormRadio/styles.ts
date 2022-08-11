import { MuiCore } from '../../../plugin.globals';
import { rem } from '../../../utils/styling/rem';

const { makeStyles } = MuiCore;

export const useStyles = makeStyles(theme => ({
    radioGroup: {
        gap: rem(10),
    },
    radioControlButton: {
        borderRadius: rem(5),
        border: '1px solid transparent',
        backgroundColor: `${theme.palette.primary.main}10`,
        transition: 'background-color 300ms ease, border 300ms ease',

        '&:hover': {
            backgroundColor: `${theme.palette.primary.main}20`,
        },

        '& .MuiTouchRipple-child': {
            backgroundColor: theme.palette.primary.main,
        },
    },
    radioControlButtonActive: {
        backgroundColor: `${theme.palette.primary.main}10`,
        border: `1px solid ${theme.palette.primary.main}80`,
    },
    radioControlLabel: {
        margin: 0,
        gap: rem(10),
        padding: `${rem(5)} ${rem(8)}`,

        '& .MuiRadio-root': {
            padding: 0,

            '&:hover': {
                backgroundColor: 'transparent',
            },
        },
    },
}));
