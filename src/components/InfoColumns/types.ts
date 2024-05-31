import React from 'react';

export interface InfoColumn {
  label: string;
  text: string | React.ReactElement;
  icon?: string | React.ReactElement;
  columnXs?: number;
}

export type InfoRow = InfoColumn[];

export interface InfoColumnsProps {
  infoRows: InfoRow[];
}
