const {
    pluginLib: { MuiCore },
} = globalThis;
const { makeStyles } = MuiCore;

export const useStyles = makeStyles(theme => {
    console.log(theme);

    return {
        actions: {
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',

            '& .MuiTooltip-popper': {
                pointerEvents: 'auto',
            },

            '& .MuiTooltip-tooltip': {
                padding: 0,
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                boxShadow:
                    '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
            },
        },
        tooltip: {},
    };
});
