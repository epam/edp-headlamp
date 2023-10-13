import CardNode from '@carbon/charts-react/diagrams/CardNode';
import { Paper } from '@material-ui/core';
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
            <Paper style={{ height, width, overflow: 'hidden' }}>
                <CardNode className={classes.node}>{children as React.ReactElement}</CardNode>
            </Paper>
        </foreignObject>
    );
};
