import React from 'react';
import { BorderedSection } from '../../../../../../components/BorderedSection';
import { InfoColumns } from '../../../../../../components/InfoColumns';
import { useInfoRows } from './hooks/useInfoRows';

export const Overview = ({ pipeline }) => {
  const infoRows = useInfoRows(pipeline);

  return (
    <BorderedSection>
      <div>
        <InfoColumns infoRows={infoRows} />
      </div>
    </BorderedSection>
  );
};
