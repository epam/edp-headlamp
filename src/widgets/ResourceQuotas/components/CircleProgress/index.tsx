import React from 'react';
import { CircleProgressProps } from './types';

export const CircleProgress: React.FC<CircleProgressProps> = ({ loadPercentage, color }) => {
  const radius = 14;
  const stroke = 4;
  const circumference = (radius - stroke) * 2 * Math.PI;

  const strokeDashoffset = circumference - (loadPercentage / 100) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2} viewBox={`0 0 ${radius * 2} ${radius * 2}`}>
      <circle
        stroke="rgba(230, 230, 230, 0.25)"
        fill="transparent"
        strokeWidth={stroke}
        r={radius - stroke}
        cx={radius}
        cy={radius}
        transform={`rotate(-90 ${radius} ${radius})`}
      />

      <circle
        stroke={color}
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference + ' ' + circumference}
        style={{ strokeDashoffset }}
        r={radius - stroke}
        cx={radius}
        cy={radius}
        transform={`rotate(-90 ${radius} ${radius})`}
      />
    </svg>
  );
};
