import { Grid } from '@mui/material';
import React from 'react';
import { PipelineKubeObject } from '../../../../k8s/groups/Tekton/Pipeline';
import { TriggerTemplateKubeObject } from '../../../../k8s/groups/Tekton/TriggerTemplate';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { PipelineList } from '../../../../widgets/PipelineList';
import { PipelinesPageWrapper } from '../../components';
import { useTypedPermissions } from './hooks/useTypedPermissions';

export const PageView = () => {
  const permissions = useTypedPermissions();

  const [pipelines, pipelinesError] = PipelineKubeObject.useList({
    namespace: getDefaultNamespace(),
  });

  const [triggerTemplates, triggerTemplatesError] = TriggerTemplateKubeObject.useList({
    namespace: getDefaultNamespace(),
  });

  const pipelinesData = React.useMemo(
    () => ({
      data: pipelines,
      error: pipelinesError,
      isLoading: pipelines === null && !pipelinesError,
    }),
    [pipelines, pipelinesError]
  );

  const triggerTemplatesData = React.useMemo(
    () => ({
      data: triggerTemplates,
      error: triggerTemplatesError,
      isLoading: triggerTemplates === null && !triggerTemplatesError,
    }),
    [triggerTemplates, triggerTemplatesError]
  );

  return (
    <PipelinesPageWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <PipelineList
            pipelines={pipelinesData}
            triggerTemplates={triggerTemplatesData}
            permissions={permissions}
          />
        </Grid>
      </Grid>
    </PipelinesPageWrapper>
  );
};
