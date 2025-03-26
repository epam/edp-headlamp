import { Stack } from '@mui/material';
import React from 'react';
import { BorderedSection } from '../../../../../../components/BorderedSection';
import { InfoColumns } from '../../../../../../components/InfoColumns';
import { useTableSettings } from '../../../../../../components/Table/components/TableSettings/hooks/useTableSettings';
import { TABLE } from '../../../../../../constants/tables';
import { PipelineKubeObjectInterface } from '../../../../../../k8s/groups/Tekton/Pipeline/types';
import { PipelineRunKubeObject } from '../../../../../../k8s/groups/Tekton/PipelineRun';
import { PipelineRunList } from '../../../../../../widgets/PipelineRunList';
import { useTypedPermissions } from '../../hooks/useTypedPermissions';
import { useInfoRows } from './hooks/useInfoRows';

export const Overview = ({ pipeline }: { pipeline: PipelineKubeObjectInterface }) => {
  const infoRows = useInfoRows(pipeline);
  const [pipelineRuns, pipelineRunsError] = PipelineRunKubeObject.useList({
    namespace: pipeline.metadata.namespace,
    labelSelector: `${'tekton.dev/pipeline'}=${pipeline.metadata.name}`,
  });

  const { loadSettings } = useTableSettings(TABLE.PIPELINE_PIPELINE_RUN_LIST.id);

  const tableSettings = loadSettings();

  const permissions = useTypedPermissions();

  return (
    <Stack spacing={2}>
      <BorderedSection>
        <div>
          <InfoColumns infoRows={infoRows} />
        </div>
      </BorderedSection>
      <PipelineRunList
        pipelineRuns={pipelineRuns}
        isLoading={pipelineRuns === null && !pipelineRunsError}
        permissions={permissions}
        filterControls={[]}
        tableId={TABLE.PIPELINE_PIPELINE_RUN_LIST.id}
        tableName={TABLE.PIPELINE_PIPELINE_RUN_LIST.name}
        tableSettings={tableSettings}
      />
    </Stack>
  );
};
