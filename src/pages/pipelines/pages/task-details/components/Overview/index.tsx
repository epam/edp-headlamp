import React from 'react';
import { BorderedSection } from '../../../../../../components/BorderedSection';
import { InfoColumns } from '../../../../../../components/InfoColumns';
import { TaskKubeObjectInterface } from '../../../../../../k8s/groups/Tekton/Task/types';
import { useInfoRows } from './hooks/useInfoRows';

export const Overview = ({ task }: { task: TaskKubeObjectInterface }) => {
  const infoRows = useInfoRows(task);

  return (
    <BorderedSection>
      <div>
        <InfoColumns infoRows={infoRows} />
      </div>
    </BorderedSection>
  );
};
