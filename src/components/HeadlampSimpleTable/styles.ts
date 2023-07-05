import { makeStyles } from '@material-ui/core';
import { rem } from '../../utils/styling/rem';

export const useStyles = makeStyles(() => ({
    tableWrapper: {
        '& .MuiTableCell-body': {
            lineHeight: '1.5',
        },

        '& .MuiTableCell-root': {
            padding: rem(10),
        },
    },
}));
