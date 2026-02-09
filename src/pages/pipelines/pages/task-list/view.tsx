import { EmptyContent } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Grid } from '@mui/material';
import React from 'react';
import { TaskKubeObject } from '../../../../k8s/groups/Tekton/Task';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { TaskList } from '../../../../widgets/TaskList';
import { PipelinesPageWrapper } from '../../components';
import { useTypedPermissions } from './hooks/useTypedPermissions';

export const PageView = () => {
  const [items, error] = TaskKubeObject.useList({
    namespace: getDefaultNamespace(),
  });

  const isLoading = items === null && !error;

  const permissions = useTypedPermissions();

  return (
    <PipelinesPageWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TaskList tasks={items} error={error} isLoading={isLoading} permissions={permissions} />
        </Grid>
        {!isLoading && items?.length === 0 && (
          <Grid item xs={12}>
            <EmptyContent color={'textSecondary'}>No tasks found</EmptyContent>
          </Grid>
        )}
      </Grid>
    </PipelinesPageWrapper>
  );
};
