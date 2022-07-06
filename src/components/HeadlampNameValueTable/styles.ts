const {
    pluginLib: { MuiCore },
} = globalThis;
const { makeStyles } = MuiCore;

export const useStyles = makeStyles(() => ({
    root: {
        '& .MuiTableCell-body': {
            lineHeight: '1.5',
        },
    },
}));
