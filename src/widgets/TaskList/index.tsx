import React from 'react';
import { EmptyList } from '../../components/EmptyList';
import { Table } from '../../components/Table';
import { useColumns } from './hooks/useColumns';
import { TaskListProps } from './types';

export const TaskList = ({ tasks, isLoading, error }: TaskListProps) => {
  const columns = useColumns();

  return (
    <Table
      error={error}
      columns={columns}
      data={tasks}
      isLoading={isLoading}
      emptyListComponent={<EmptyList missingItemName={'tasks'} />}
    />
  );
};
