import React from 'react';
import { EmptyList } from '../../components/EmptyList';
import { LoadingWrapper } from '../../components/LoadingWrapper';
import { Table } from '../../components/Table';
import { TABLE } from '../../constants/tables';
import { Filter } from '../../providers/Filter/components/Filter';
import { NamespaceControl } from '../../providers/Filter/components/Filter/components/NamespaceControl';
import { SearchControl } from '../../providers/Filter/components/Filter/components/SearchControl';
import { useFilterContext } from '../../providers/Filter/hooks';
import { getClusterSettings } from '../../utils/getClusterSettings';
import { sortKubeObjectByCreationTimestamp } from '../../utils/sort/sortKubeObjectsByCreationTimestamp';
import { useColumns } from './hooks/useColumns';
import { PipelineListProps } from './types';

export const PipelineList = ({ pipelines, triggerTemplates, permissions }: PipelineListProps) => {
  const columns = useColumns({ permissions, triggerTemplates: triggerTemplates.data });

  const sortedPipelines = React.useMemo(() => {
    return pipelines.data?.sort(sortKubeObjectByCreationTimestamp);
  }, [pipelines]);

  const { filterFunction } = useFilterContext();

  return (
    <LoadingWrapper isLoading={triggerTemplates.isLoading}>
      <Table
        id={TABLE.PIPELINE_LIST.id}
        name={TABLE.PIPELINE_LIST.name}
        blockerError={pipelines.error}
        columns={columns}
        data={sortedPipelines}
        isLoading={pipelines.isLoading}
        filterFunction={filterFunction}
        emptyListComponent={<EmptyList missingItemName={'pipelines'} />}
        slots={{
          header: (
            <Filter
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
    </LoadingWrapper>
  );
};
