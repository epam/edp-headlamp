import React from 'react';
import { EmptyList } from '../../components/EmptyList';
import { Table } from '../../components/Table';
import { sortKubeObjectByCreationTimestamp } from '../../utils/sort/sortKubeObjectsByCreationTimestamp';
import { useColumns } from './hooks/useColumns';
import { PipelineListProps } from './types';

export const PipelineList = ({ pipelines, isLoading, error }: PipelineListProps) => {
  const columns = useColumns();

  const sortedPipelines = React.useMemo(() => {
    return pipelines?.sort(sortKubeObjectByCreationTimestamp);
  }, [pipelines]);

  return (
    <Table
      error={error}
      columns={columns}
      data={sortedPipelines}
      isLoading={isLoading}
      emptyListComponent={<EmptyList missingItemName={'pipelines'} />}
    />
  );
};
