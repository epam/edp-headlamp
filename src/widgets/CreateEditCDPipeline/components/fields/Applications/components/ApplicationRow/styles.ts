import { makeStyles } from '@material-ui/core';
import { rem } from '../../../../../../../utils/styling/rem';

export const useStyles = makeStyles(() => ({
    application: {
        '& .MuiFormControlLabel-root': {
            margin: 0,
        },
        '& .MuiCheckbox-root': {
            padding: rem(4),
        },
    },
}));
