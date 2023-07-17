import { makeStyles } from '@material-ui/core';
import { rem } from '../../../../utils/styling/rem';

export const useStyles = makeStyles((theme: DefaultTheme) => ({
    labelWrap: {
        display: 'flex',
        alignItems: 'center',
        gap: rem(7),
        height: '100%',

        '& svg': {
            pointerEvents: 'auto',
            marginBottom: rem(5),
        },
    },
    label: {
        fontSize: rem(14),
        lineHeight: 1,
        color: theme.palette.text.primary,
    },
}));
