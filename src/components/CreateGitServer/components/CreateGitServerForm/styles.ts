import { makeStyles } from '@material-ui/core';
import { rem } from '../../../../utils/styling/rem';

export const useStyles = makeStyles((theme: DefaultTheme) => ({
    form: {
        width: '100%',
        position: 'relative',
        paddingRight: rem(16),

        '& form': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
        },
    },
    formInner: {
        flex: `1 0 calc(100% - ${rem(75)})`,
        minHeight: rem(100),
        padding: `${rem(16)} ${rem(24)}`,
        overflowY: 'auto',
    },
    actions: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        gap: rem(20),
        padding: rem(20),
        backgroundColor: theme.palette.background.paper,
        boxShadow: `0 ${rem(-5)} ${rem(54)} ${rem(-28)} rgba(0,0,0, 0.38)`,
    },
}));
