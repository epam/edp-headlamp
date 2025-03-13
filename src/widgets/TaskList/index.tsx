import React from 'react';
import { EmptyList } from '../../components/EmptyList';
import { Table } from '../../components/Table';
import { TABLE } from '../../constants/tables';
import { Filter } from '../../providers/Filter/components/Filter';
import { NamespaceControl } from '../../providers/Filter/components/Filter/components/NamespaceControl';
import { SearchControl } from '../../providers/Filter/components/Filter/components/SearchControl';
import { useFilterContext } from '../../providers/Filter/hooks';
import { getClusterSettings } from '../../utils/getClusterSettings';
import { useColumns } from './hooks/useColumns';
import { TaskListProps } from './types';

export const TaskList = ({ tasks, isLoading, error, permissions }: TaskListProps) => {
  const columns = useColumns({ permissions });

  const { filterFunction } = useFilterContext();

  return (
    <Table
      id={TABLE.TASK_LIST.id}
      name={TABLE.TASK_LIST.name}
      blockerError={error}
      columns={columns}
      data={tasks}
      isLoading={isLoading}
      filterFunction={filterFunction}
      emptyListComponent={<EmptyList missingItemName={'tasks'} />}
      slots={{
        header: (
          <Filter
            hideFilter={false}
            controls={{
              search: {
                component: <SearchControl />,
              },
              ...((getClusterSettings()?.allowedNamespaces || []).length > 1
                ? {
                    namespace: {
                      component: <NamespaceControl />,
                    },
                  }
                : {}),
            }}
          />
        ),
      }}
    />
  );
};
