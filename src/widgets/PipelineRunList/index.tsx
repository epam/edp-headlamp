import React from 'react';
import { EmptyList } from '../../components/EmptyList';
import { Table } from '../../components/Table';
import { useColumns } from './hooks/useColumns';
import { PipelineRunListProps } from './types';

export const PipelineRunList = ({
  pipelineRuns,
  isLoading,
  filterFunction,
  error,
}: PipelineRunListProps) => {
  const columns = useColumns();

  return (
    <Table
      error={error}
      columns={columns}
      data={pipelineRuns}
      isLoading={isLoading}
      emptyListComponent={<EmptyList missingItemName={'pipeline runs'} />}
      filterFunction={filterFunction}
    />
  );
};
