import { MuiCore } from '../../../../../../../../plugin.globals';
import { rem } from '../../../../../../../../utils/styling/rem';

const { makeStyles } = MuiCore;

export const useStyles = makeStyles((theme: DefaultTheme) => ({
    message: {
        display: 'flex',
        alignItems: 'center',
    },
    conflictEntityName: {
        backgroundColor: theme.palette.action.selected,
        padding: `${rem(2)} ${rem(15)}`,
        margin: `0 ${rem(5)}`,
        borderRadius: rem(5),
    },
}));
