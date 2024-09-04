import { Stack } from '@mui/material';
import React from 'react';
import { EmptyList } from '../../components/EmptyList';
import { Table } from '../../components/Table';
import { TaskKubeObjectInterface } from '../../k8s/groups/Tekton/Task/types';
import { Filter } from '../../providers/Filter/components/Filter';
import { SearchControl } from '../../providers/Filter/components/Filter/components/SearchControl';
import { useFilterContext } from '../../providers/Filter/hooks';
import { useColumns } from './hooks/useColumns';
import { TaskListProps } from './types';

type Controls = 'search';

export const TaskList = ({ tasks, isLoading, error }: TaskListProps) => {
  const columns = useColumns();

  const { filterFunction } = useFilterContext<TaskKubeObjectInterface, Controls>();

  return (
    <Stack spacing={2}>
      <Filter
        hideFilter={false}
        controls={{
          search: {
            component: <SearchControl />,
          },
          namespace: {
            component: null,
          },
        }}
      />
      <Table
        error={error}
        columns={columns}
        data={tasks}
        isLoading={isLoading}
        filterFunction={filterFunction}
        emptyListComponent={<EmptyList missingItemName={'tasks'} />}
      />
    </Stack>
  );
};
