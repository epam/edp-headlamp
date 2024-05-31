import { lighten } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => {
  const commonCardRating = {
    height: theme.typography.pxToRem(21),
    width: theme.typography.pxToRem(21),
    color: theme.palette.common.white,
    fontSize: theme.typography.pxToRem(13),
  };

  return {
    ratingDefault: {
      ...commonCardRating,
      background: '#E6E6F0',
    },
    ratingA: {
      ...commonCardRating,
      background: '#18BE94',
    },
    ratingB: {
      ...commonCardRating,
      background: lighten('#18BE94', 0.5),
    },
    ratingC: {
      ...commonCardRating,
      background: '#FFC754',
    },
    ratingD: {
      ...commonCardRating,
      background: '#FF8832',
    },
    ratingE: {
      ...commonCardRating,
      background: '#FD4C4D',
    },
  };
});
