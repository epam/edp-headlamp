import { Stack } from '@mui/material';
import React from 'react';
import { EmptyList } from '../../components/EmptyList';
import { Table } from '../../components/Table';
import { PipelineKubeObjectInterface } from '../../k8s/groups/Tekton/Pipeline/types';
import { Filter } from '../../providers/Filter/components/Filter';
import { SearchControl } from '../../providers/Filter/components/Filter/components/SearchControl';
import { useFilterContext } from '../../providers/Filter/hooks';
import { sortKubeObjectByCreationTimestamp } from '../../utils/sort/sortKubeObjectsByCreationTimestamp';
import { useColumns } from './hooks/useColumns';
import { PipelineListProps } from './types';

type Controls = 'search';

export const PipelineList = ({ pipelines, isLoading, error }: PipelineListProps) => {
  const columns = useColumns();

  const sortedPipelines = React.useMemo(() => {
    return pipelines?.sort(sortKubeObjectByCreationTimestamp);
  }, [pipelines]);

  const { filterFunction } = useFilterContext<PipelineKubeObjectInterface, Controls>();

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
        blockerError={error}
        columns={columns}
        data={sortedPipelines}
        isLoading={isLoading}
        filterFunction={filterFunction}
        emptyListComponent={<EmptyList missingItemName={'pipelines'} />}
      />
    </Stack>
  );
};
