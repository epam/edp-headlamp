import { MuiCore } from '../../plugin.globals';

const { makeStyles } = MuiCore;

export const useStyles = makeStyles(theme => ({
    statusLabel: {
        fontSize: '1.1em',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0.5),
        display: 'inline-block',
        textAlign: 'center',
        backgroundColor: theme.palette.warning.light,
        color: theme.palette.warning.main,
    },
}));
