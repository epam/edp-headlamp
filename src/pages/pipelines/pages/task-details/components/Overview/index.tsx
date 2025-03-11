import React from 'react';
import { BorderedSection } from '../../../../../../components/BorderedSection';
import { InfoColumns } from '../../../../../../components/InfoColumns';
import { useInfoRows } from './hooks/useInfoRows';

export const Overview = ({ task }) => {
  const infoRows = useInfoRows(task);

  return (
    <BorderedSection>
      <div>
        <InfoColumns infoRows={infoRows} />
      </div>
    </BorderedSection>
  );
};
