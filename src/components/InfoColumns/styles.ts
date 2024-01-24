import { alpha } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { rem } from '../../utils/styling/rem';

export const useStyles = makeStyles((theme) => {
  return {
    accordionRoot: {
      border: `1px dashed ${alpha(theme.palette.common.black, 0.2)}`,

      '&::before': {
        display: 'none',
      },
    },
    accordionSummary: {
      minHeight: 'auto',
    },
    root: {
      border: `1px dashed ${alpha(theme.palette.common.black, 0.2)}`,
      padding: rem(10),
    },
  };
});
