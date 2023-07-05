import CardNode, { CardNodeColumn, CardNodeTitle } from '@carbon/charts-react/diagrams/CardNode';
import { Link, Paper } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { StatusIcon } from '../../../StatusIcon';
import { useStyles } from './styles';
import { NodeProps } from './types';

export const Node = ({ x, y, height, width, status, title, url }: NodeProps) => {
    const classes = useStyles();

    return (
        <foreignObject
            transform={`translate(${x},${y})`}
            height={height}
            width={width}
            style={{ overflow: 'visible' }}
        >
            <Paper style={{ height, width, overflow: 'hidden' }}>
                <CardNode className={clsx(classes.node, `card-status-${status}`)}>
                    <CardNodeColumn>
                        <StatusIcon status={status} width={20} />
                    </CardNodeColumn>
                    <CardNodeColumn>
                        <CardNodeTitle>
                            {url ? (
                                <Link href={url} target={'_blank'}>
                                    {title}
                                </Link>
                            ) : (
                                <span title={title}>{title}</span>
                            )}
                        </CardNodeTitle>
                    </CardNodeColumn>
                </CardNode>
            </Paper>
        </foreignObject>
    );
};
