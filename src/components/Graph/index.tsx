import { ArrowRightMarker } from '@carbon/charts-react/diagrams/Marker';
import { ElkNode } from 'elkjs';
import ELK from 'elkjs/lib/elk.bundled';
import React, { useEffect, useState } from 'react';
import { Edge } from './components/Edge';
import { Node } from './components/Node';
import { GraphProps } from './components/types';

export const Graph = ({ direction = 'RIGHT', id, nodes, edges, type = 'detailed' }: GraphProps) => {
    const elk = React.useMemo(
        () =>
            new ELK({
                defaultLayoutOptions: {
                    'elk.algorithm': 'layered',
                    'elk.direction': direction,
                    'elk.edgeRouting': 'ORTHOGONAL',
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

    if (!positions) return null;

    const {
        children: graphNodes,
        edges: graphEdges,
        height: graphHeight,
        width: graphWidth,
    } = positions;

    return (
        <div className="tkn--pipeline-graph">
            <svg style={{ height: graphHeight, width: graphWidth }}>
                <defs>
                    <ArrowRightMarker id="arrowRight" />
                </defs>
                {graphEdges.map((edge, i) => {
                    return <Edge direction={direction} key={`edge_${i}`} {...edge} />;
                })}
                {graphNodes.map((node, i) => {
                    //@ts-ignore
                    return <Node key={`node_${i}`} {...node} />;
                })}
            </svg>
        </div>
    );
};
