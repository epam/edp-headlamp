import { MuiCore } from '../../plugin.globals';

const { makeStyles } = MuiCore;

export const useStyles = makeStyles(() => ({
    root: {
        '& .MuiTableCell-body': {
            lineHeight: '1.5',
        },
    },
}));
