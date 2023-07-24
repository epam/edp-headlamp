import { makeStyles } from '@material-ui/core';
import { rem } from '../../utils/styling/rem';

export const useStyles = makeStyles(theme => ({
    tabs: {
        margin: `${rem(20)} 0`,
        boxShadow: theme.shadows[1],
        borderRadius: rem(5),
    },
    disabledTab: {
        backgroundColor: theme.palette.action.disabled,
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
}));
