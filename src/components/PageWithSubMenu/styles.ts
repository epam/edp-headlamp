import { makeStyles } from '@material-ui/core';
import { rem } from '../../utils/styling/rem';

export const useStyles = () => {
    return makeStyles(() => ({
        subMenu: {
            '& .MuiDrawer-paper': {
                position: 'initial',
            },
        },
        subMenuAndContentWrapper: {
            display: 'flex',
            flexWrap: 'nowrap',
            gap: rem(20),
            paddingTop: rem(30),
        },
        subMenuWrapper: {
            flexShrink: 0,
        },
        contentWrapper: {
            flexGrow: 1,
        },
    }))();
};
