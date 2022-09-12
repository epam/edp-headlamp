import { MuiCore } from '../../../../plugin.globals';
import { rem } from '../../../../utils/styling/rem';

const { makeStyles } = MuiCore;

export const useStyles = makeStyles((theme: DefaultTheme) => ({
    floatingAddButton: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
    },
    floatingAddButtonIcon: {
        width: rem(20),
        height: rem(20),
        color: theme.palette.text.primary,
    },
}));
