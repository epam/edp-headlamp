import CarbonEdge from '@carbon/charts-react/diagrams/Edge/Edge';
import { path as d3Path } from 'd3-path';
import React from 'react';
import { EdgeProps } from './types';

export const Edge = ({ direction, color, sections: _sections, noArrow }: EdgeProps) => {
  const section = _sections?.[0];

  if (!section) {
    return null;
  }

  const path = d3Path();

  path.moveTo(section.startPoint.x, section.startPoint.y);

  if (section.bendPoints) {
    section.bendPoints.forEach((b) => {
      path.lineTo(b.x, b.y);
    });
  }

  path.lineTo(
    section.endPoint.x - (direction === 'RIGHT' ? 3 : 0),
    section.endPoint.y - (direction === 'RIGHT' ? 0 : 3)
  );

  return (
    <CarbonEdge
      path={path.toString()}
      markerEnd={noArrow ? null : 'arrowRight'}
      variant="dash-sm"
      color={color}
    />
  );
};
