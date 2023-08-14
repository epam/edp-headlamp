import { alpha, makeStyles } from '@material-ui/core';

export const useStyles = (isExpanded: boolean, disabled: boolean) =>
    makeStyles(theme => ({
        accordion: {
            borderStyle: 'dashed',
            borderWidth: '1px',
            borderColor: isExpanded
                ? alpha(theme.palette.primaryColor, 0.1)
                : alpha(theme.palette.primaryColor, 0.2),

            '&.Mui-disabled': {
                backgroundColor: alpha(theme.palette.primaryColor, 0.02),
            },

            '&:hover':
                !isExpanded && !disabled
                    ? {
                          borderColor: alpha(theme.palette.primaryColor, 0.4),
                      }
                    : {},
        },
        icon: {
            display: 'block',
        },
    }))();
