import CardNode from '@carbon/charts-react/diagrams/CardNode';
import { Paper } from '@mui/material';
import React from 'react';
import { useStyles } from './styles';
import { NodeProps } from './types';

export const Node: React.FC<NodeProps> = ({ x, y, height, width, color, children }) => {
  const classes = useStyles(color);

  return (
    <foreignObject
      transform={`translate(${x},${y})`}
      height={height}
      width={width}
      style={{ overflow: 'visible' }}
    >
      <Paper sx={{ height, width }} elevation={0}>
        <CardNode className={classes.node}>{children as React.ReactElement}</CardNode>
      </Paper>
    </foreignObject>
  );
};
