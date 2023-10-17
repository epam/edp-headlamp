import '@carbon/charts/styles-g90.css';
import { ArrowRightMarker } from '@carbon/charts-react/diagrams/Marker';
import { Icon } from '@iconify/react';
import { IconButton, Paper, Tooltip } from '@material-ui/core';
import { ElkNode } from 'elkjs';
import ELK from 'elkjs/lib/elk.bundled';
import React, { useEffect, useState } from 'react';
import { ReactZoomPanPinchRef, TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { GraphProps } from './components/types';
import { useStyles } from './styles';

export const Graph = ({
    direction = 'RIGHT',
    id,
    nodes,
    edges,
    renderEdge,
    renderNode,
    type = 'detailed',
}: GraphProps) => {
    const classes = useStyles();

    const elk = React.useMemo(
        () =>
            new ELK({
                defaultLayoutOptions: {
                    'elk.algorithm': 'layered',
                    'elk.direction': direction,
                    'elk.edgeRouting': 'POLYLINE',
                    'elk.layered.mergeEdges': true as unknown as string,
                    'elk.layered.nodePlacement.strategy': 'NETWORK_SIMPLEX',
                    separateConnectedComponents: false as unknown as string,
                    'spacing.nodeNode':
                        type === 'detailed' ? (20 as unknown as string) : (5 as unknown as string),
                    'spacing.nodeNodeBetweenLayers':
                        type === 'detailed' ? (50 as unknown as string) : (20 as unknown as string),
                },
            }),
        [direction, type]
    );

    const [positions, setPositions] = useState<ElkNode>(null);

    const graph = React.useMemo(
        () => ({
            id,
            children: nodes,
            edges,
        }),
        [edges, id, nodes]
    );

    useEffect(() => {
        elk.layout(graph)
            .then(g => {
                setPositions(g);
            })
            .catch(console.error);
    }, [direction, elk, graph]);

    const transformComponentRef = React.useRef<ReactZoomPanPinchRef | null>(null);

    if (!positions) return null;

    const {
        children: graphNodes,
        edges: graphEdges,
        height: graphHeight,
        width: graphWidth,
    } = positions;

    return (
        <Paper className={classes.root} elevation={2}>
            <TransformWrapper
                initialScale={1.5}
                minScale={0.8}
                initialPositionX={0}
                initialPositionY={-50}
                ref={transformComponentRef}
            >
                {({ zoomIn, zoomOut, resetTransform, setTransform }) => {
                    return (
                        <React.Fragment>
                            <TransformComponent>
                                <svg
                                    style={{ height: graphHeight + 100, width: graphWidth }}
                                    viewBox={`0 0 ${graphWidth} ${graphHeight}`}
                                    id="graph-svg"
                                >
                                    <defs>
                                        <ArrowRightMarker id="arrowRight" />
                                    </defs>
                                    {graphEdges.map((edge, i) => {
                                        return (
                                            <React.Fragment key={`edge_${i}`}>
                                                {renderEdge(edge)}
                                            </React.Fragment>
                                        );
                                    })}
                                    {graphNodes.map((node, i) => {
                                        return (
                                            <React.Fragment key={`node_${i}`}>
                                                {renderNode(node)}
                                            </React.Fragment>
                                        );
                                    })}
                                </svg>
                            </TransformComponent>
                            <div className="tools">
                                <Tooltip title={'Zoom-In'}>
                                    <IconButton onClick={() => zoomIn()}>
                                        <Icon icon={ICONS.ZOOM_IN} />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title={'Zoom-Out'}>
                                    <IconButton onClick={() => zoomOut()}>
                                        <Icon icon={ICONS.ZOOM_OUT} />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title={'Fit to screen'}>
                                    <IconButton onClick={() => setTransform(0, 0, 1)}>
                                        <Icon icon={ICONS.FIT_TO_SCREEN} />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title={'Reset transform'}>
                                    <IconButton onClick={() => resetTransform()}>
                                        <Icon icon={ICONS.ZOOM_OUT_MAP} />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </React.Fragment>
                    );
                }}
            </TransformWrapper>
        </Paper>
    );
};
