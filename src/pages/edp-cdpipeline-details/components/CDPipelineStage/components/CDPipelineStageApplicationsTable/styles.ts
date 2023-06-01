import { MuiCore } from '../../../../../../plugin.globals';
import { rem } from '../../../../../../utils/styling/rem';

const { makeStyles } = MuiCore;

export const useStyles = makeStyles(theme => ({
    tableRoot: {
        '& .MuiTableCell-root': {
            fontSize: '1rem',
        },
        '& .MuiTableCell-head': {
            fontWeight: 'bold',
            color: theme.palette.tables.headerText,
            fontSize: '1.1rem',
        },
        '& .MuiTableHeader-root': {
            '& .MuiTableCell-root': {
                '&:nth-child(1)': {
                    width: rem(240),
                },
                '&:nth-child(2)': {
                    width: rem(200),
                },
            },
        },
        '& .MuiTableBody-root': {
            '& .MuiTableCell-root': {
                '&:nth-child(1)': {
                    width: rem(80),
                },
                '&:nth-child(2)': {
                    width: rem(80),
                },
                '&:nth-child(3)': {
                    width: rem(80),
                },
                '&:nth-child(4)': {
                    width: rem(200),
                },
                '&:nth-child(5)': {
                    width: rem(300),
                },
            },
        },
    },
}));
