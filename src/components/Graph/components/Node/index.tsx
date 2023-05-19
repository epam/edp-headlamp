import CardNode, { CardNodeColumn, CardNodeTitle } from '@carbon/charts-react/diagrams/CardNode';
import clsx from 'clsx';
import React from 'react';
import { MuiCore } from '../../../../plugin.globals';
import { StatusIcon } from '../../../StatusIcon';
import { useStyles } from './styles';
import { NodeProps } from './types';
const { Paper } = MuiCore;
const { Link: MuiLink } = MuiCore;

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
                                <MuiLink href={url} target={'_blank'}>
                                    {title}
                                </MuiLink>
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
