import { makeStyles } from '@material-ui/core';
import { rem } from '../../../../utils/styling/rem';

export const useStyles = makeStyles((theme: DefaultTheme) => ({
    fabWrapper: {
        position: 'sticky',
        bottom: '0',
        left: '100%',
        translate: `${rem(46)} 0`,
        height: 0,
        display: 'flex',
    },
    button: {
        marginLeft: 'auto',
        translate: `0 ${rem(-65)}`,
        backgroundColor: theme.palette.background.paper,
    },
    buttonIcon: {
        width: rem(20),
        height: rem(20),
        color: theme.palette.text.primary,
    },
}));
