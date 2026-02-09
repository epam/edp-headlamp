import React from 'react';
import { BorderedSection } from '../../../../../../components/BorderedSection';
import { InfoColumns } from '../../../../../../components/InfoColumns';
import { useInfoRows } from './hooks/useInfoRows';

export const Overview = () => {
  const infoRows = useInfoRows();

  return (
    <BorderedSection>
      <div>
        <InfoColumns infoRows={infoRows} />
      </div>
    </BorderedSection>
  );
};
