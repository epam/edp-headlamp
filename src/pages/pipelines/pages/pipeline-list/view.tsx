import { EmptyContent } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Grid } from '@mui/material';
import React from 'react';
import { PipelineKubeObject } from '../../../../k8s/groups/Tekton/Pipeline';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { PipelineList } from '../../../../widgets/PipelineList';
import { PipelinesPageWrapper } from '../../components';
import { useTypedPermissions } from './hooks/useTypedPermissions';

export const PageView = () => {
  const permissions = useTypedPermissions();

  const [items, error] = PipelineKubeObject.useList({
    namespace: getDefaultNamespace(),
  });

  const isLoading = items === null && !error;

  return (
    <PipelinesPageWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <PipelineList pipelines={items} error={error} isLoading={isLoading} permissions={permissions} />
        </Grid>
        {!isLoading && items?.length === 0 && (
          <Grid item xs={12}>
            <EmptyContent color={'textSecondary'}>No pipelines found</EmptyContent>
          </Grid>
        )}
      </Grid>
    </PipelinesPageWrapper>
  );
};
