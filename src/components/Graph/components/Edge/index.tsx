import CarbonEdge from '@carbon/charts-react/diagrams/Edge/Edge';
import { path as d3Path } from 'd3-path';
import React from 'react';
import { getCustomResourceStatusIconByStatusName } from '../../../../utils/styling/getCustomResourceStatusIconByStatusName';
import { EdgeProps } from './types';

export const Edge = ({ direction, status, sections: _sections }: EdgeProps) => {
    const sections = _sections[0];
    const path = d3Path();

    path.moveTo(sections.startPoint.x, sections.startPoint.y);

    if (sections.bendPoints) {
        sections.bendPoints.forEach(b => {
            path.lineTo(b.x, b.y);
        });
    }

    path.lineTo(
        sections.endPoint.x - (direction === 'RIGHT' ? 3 : 0),
        sections.endPoint.y - (direction === 'RIGHT' ? 0 : 3)
    );

    const [, color] = getCustomResourceStatusIconByStatusName(status);

    return (
        <CarbonEdge path={path.toString()} markerEnd="arrowRight" variant="dash-sm" color={color} />
    );
};
