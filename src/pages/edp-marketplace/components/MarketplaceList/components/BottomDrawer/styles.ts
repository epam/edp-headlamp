import { makeStyles } from '@material-ui/core';
import { rem } from '../../../../../../utils/styling/rem';

export const useStyles = makeStyles(() => ({
    drawerPaper: {
        top: '64px',
        bottom: 0,
        padding: `${rem(20)}`,
        maxWidth: rem(500),
    },
}));
