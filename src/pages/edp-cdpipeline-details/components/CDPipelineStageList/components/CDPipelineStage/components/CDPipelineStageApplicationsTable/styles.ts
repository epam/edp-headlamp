import { MuiCore } from '../../../../../../../../plugin.globals';
import { rem } from '../../../../../../../../utils/styling/rem';

const { makeStyles } = MuiCore;

export const useStyles = makeStyles(() => ({
    tableRoot: {
        '& .MuiTableCell-root': {
            '&:nth-child(1)': {
                width: rem(80),
            },
            '&:nth-child(2)': {
                width: rem(80),
            },
            '&:nth-child(3)': {
                width: rem(200),
            },
            '&:nth-child(4)': {
                width: rem(200),
            },
        },
    },
}));
