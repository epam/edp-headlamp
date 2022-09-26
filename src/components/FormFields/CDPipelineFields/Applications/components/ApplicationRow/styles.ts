import { MuiCore } from '../../../../../../plugin.globals';
import { rem } from '../../../../../../utils/styling/rem';

const { makeStyles } = MuiCore;

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
