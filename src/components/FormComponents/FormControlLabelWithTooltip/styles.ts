import { MuiCore } from '../../../plugin.globals';
import { rem } from '../../../utils/styling/rem';

const { makeStyles } = MuiCore;

export const useStyles = makeStyles(theme => {
    return {
        labelWrap: {
            display: 'flex',
            alignItems: 'center',
            gap: rem(7),

            '& svg': {
                pointerEvents: 'auto',
                marginBottom: rem(2),
            },
        },
        label: {
            fontSize: rem(14),
            lineHeight: 1,
            color: theme.palette.text.secondary,
        },
    };
});
