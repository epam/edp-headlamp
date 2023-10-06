import CardNode, { CardNodeColumn, CardNodeTitle } from '@carbon/charts-react/diagrams/CardNode';
import { Link, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { StatusIcon } from '../../../StatusIcon';
import { useStyles } from './styles';
import { NodeProps } from './types';

export const Node = ({
    x,
    y,
    height,
    width,
    title,
    url,
    icon,
    color,
    isRotating,
    status,
}: NodeProps) => {
    const classes = useStyles(color);

    return (
        <foreignObject
            transform={`translate(${x},${y})`}
            height={height}
            width={width}
            style={{ overflow: 'visible' }}
        >
            <Paper style={{ height, width, overflow: 'hidden' }}>
                <CardNode className={classes.node}>
                    <CardNodeColumn>
                        <StatusIcon
                            icon={icon}
                            color={color}
                            isRotating={isRotating}
                            Title={status}
                            width={15}
                        />
                    </CardNodeColumn>
                    <CardNodeColumn>
                        <CardNodeTitle>
                            {url ? (
                                <Link href={url} target={'_blank'}>
                                    {title}
                                </Link>
                            ) : (
                                <Typography variant={'subtitle2'} title={title}>
                                    {title}
                                </Typography>
                            )}
                        </CardNodeTitle>
                    </CardNodeColumn>
                </CardNode>
            </Paper>
        </foreignObject>
    );
};
