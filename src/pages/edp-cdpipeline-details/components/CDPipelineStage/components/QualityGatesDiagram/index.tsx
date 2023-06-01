import '@carbon/charts/styles-g90.css';
import { Graph } from '../../../../../../components/Graph';
import { React } from '../../../../../../plugin.globals';

export const QualityGatesDiagram = ({ nodes, edges }) => {
    return <Graph direction={'RIGHT'} nodes={nodes} edges={edges} id={'quality-gates'} />;
};
