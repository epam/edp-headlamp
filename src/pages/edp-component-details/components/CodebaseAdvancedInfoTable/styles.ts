import { makeStyles } from '@material-ui/core';
import { rem } from '../../../../utils/styling/rem';

export const useStyles = makeStyles((theme: DefaultTheme) => ({
    statusLabel: {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.metadataBgColor,
        fontSize: rem(14),
        wordBreak: 'break-all',
        padding: `${rem(2)} ${rem(8)}`,
        borderRadius: rem(4),
    },
    divider: { margin: `${rem(4)} 0 ${rem(12)} 0` },
    valueField: {
        marginTop: rem(8),
    },
}));
