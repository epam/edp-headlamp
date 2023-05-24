import { MuiCore } from '../../plugin.globals';
import { rem } from '../../utils/styling/rem';

const { makeStyles } = MuiCore;

export const useStyles = makeStyles((theme: DefaultTheme) => ({
    button: {
        position: 'sticky',
        bottom: '0',
        left: '100%',
        transform: `translate(${rem(46)}, -20%)`,
        backgroundColor: theme.palette.background.paper,
    },
    buttonIcon: {
        width: rem(20),
        height: rem(20),
        color: theme.palette.text.primary,
    },
}));
