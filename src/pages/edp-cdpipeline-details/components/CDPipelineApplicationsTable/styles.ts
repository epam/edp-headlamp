import { MuiCore } from '../../../../plugin.globals';

const { makeStyles } = MuiCore;

export const useStyles = makeStyles(() => {
    return {
        tableWrapper: {
            '& .MuiTableCell-root': {
                '&:nth-child(1)': {
                    width: '10%',
                },
                '&:nth-child(2)': {
                    width: '70%',
                },
                '&:nth-child(3)': {
                    width: '20%',
                },
            },
        },
    };
});
