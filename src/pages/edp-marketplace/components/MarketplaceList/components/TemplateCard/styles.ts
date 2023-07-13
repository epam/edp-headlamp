import { alpha, makeStyles } from '@material-ui/core';
import { rem } from '../../../../../../utils/styling/rem';

export const useStyles = makeStyles(theme => ({
    formControl: {
        margin: 0,
        height: '100%',

        '& > .MuiTypography-root': {
            height: '100%',
        },
    },
    cardRoot: {
        height: '100%',
        transition: 'background-color 0.2s ease-in-out',

        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
    },
    cardRootActive: {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    },
    cardActions: {
        marginTop: 'auto',
    },
    cardContentHeader: {
        height: '3.2em',
        overflow: 'hidden',
    },
    cardContent: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: rem(16),

        '&:last-child': {
            paddingBottom: rem(16),
        },
    },
    cardContentRow: {
        '&:not(:last-child)': {
            marginBottom: rem(15),
        },
    },
    chipWithRoundedAvatar: {
        '& .MuiChip-avatar': {
            borderRadius: '50%',
        },
    },
    templateName: {
        display: '-webkit-box',
        '-webkit-line-clamp': 2,
        '-webkit-box-orient': 'vertical',
        overflow: 'hidden',
        fontSize: '1rem',
        fontWeight: 600,
    },
    templateDescription: {
        display: '-webkit-box',
        '-webkit-line-clamp': 3,
        '-webkit-box-orient': 'vertical',
        overflow: 'hidden',
    },
    templateIcon: {
        height: rem(40),
        verticalAlign: 'middle',
    },
}));
