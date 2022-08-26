import { MuiCore } from '../../plugin.globals';
import { rem } from '../../utils/styling/rem';

const { makeStyles } = MuiCore;

export const useStyles = () =>
    makeStyles(theme => ({
        statusLabel: {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.metadataBgColor,
            fontSize: rem(14),
            wordBreak: 'break-word',
            padding: `${rem(4)} ${rem(8)}`,
            borderRadius: rem(5),
        },
    }));
