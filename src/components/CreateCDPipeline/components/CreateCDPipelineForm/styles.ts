import { MuiCore } from '../../../../plugin.globals';
import { rem } from '../../../../utils/styling/rem';

const { makeStyles } = MuiCore;

export const useStyles = makeStyles((theme: DefaultTheme) => ({
    form: {
        width: '80%',
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
        overflowY: 'auto',
    },
    tabs: {
        backgroundColor: theme.palette.background.default,
        borderRadius: rem(5),
        width: '20%',
    },
    tabPanel: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',

        '&[hidden]': {
            height: 0,
            overflow: 'hidden',
        },
    },
    tabPanelInner: {
        padding: `${rem(16)} ${rem(16)} ${rem(32)} ${rem(16)}`,
    },
    tabPanelActions: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        gap: rem(20),
        padding: rem(20),
        backgroundColor: theme.palette.background.paper,
        boxShadow: `0 ${rem(-5)} ${rem(54)} ${rem(-28)} rgba(0,0,0, 0.38)`,
    },
}));
