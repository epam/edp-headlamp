import { TileChart } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { TileChartProps } from '@kinvolk/headlamp-plugin/lib/components/common/TileChart/TileChart';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';

const useStyles = makeStyles(() => ({
  root: {
    '& > .MuiPaper-root': {
      maxWidth: 'initial',
    },
  },
}));

export const HeadlampTileChart = (props: TileChartProps) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <TileChart {...props} />
    </div>
  );
};
