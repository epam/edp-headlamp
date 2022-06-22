import { rem } from '../../../../utils/styling/rem';

const {
    pluginLib: { MuiCore },
} = window;
const { makeStyles } = MuiCore;

export const useStyles = makeStyles(theme => ({
    floatingAddButton: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    floatingAddButtonIcon: {
        width: rem(20),
        height: rem(20),
    },
}));
