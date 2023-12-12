import { lighten, makeStyles } from '@material-ui/core';
import { rem } from '../../../../utils/styling/rem';

const okColor = '#1DB954';
const abortedColor = '#757575';
const pendingColor = '#FFED51';
const warningColor = '#FF9800';
const errorColor = '#F84C55';

export const useStyles = makeStyles(theme => {
    const commonCardRating = {
        height: rem(16),
        width: rem(16),
        color: theme.palette.common.white,
        fontSize: rem(12),
    };

    return {
        ratingDefault: {
            ...commonCardRating,
            background: abortedColor,
        },
        ratingA: {
            ...commonCardRating,
            background: okColor,
        },
        ratingB: {
            ...commonCardRating,
            background: lighten(okColor, 0.5),
        },
        ratingC: {
            ...commonCardRating,
            background: pendingColor,
        },
        ratingD: {
            ...commonCardRating,
            background: warningColor,
        },
        ratingE: {
            ...commonCardRating,
            background: errorColor,
        },
    };
});
