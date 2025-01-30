import React from 'react';
import { EmptyList } from '../../../../components/EmptyList';
import { Table } from '../../../../components/Table';
import { TABLES } from '../../../../constants/tables';
import { useDialogContext } from '../../../../providers/Dialog/hooks';
import { Filter } from '../../../../providers/Filter/components/Filter';
import { NamespaceControl } from '../../../../providers/Filter/components/Filter/components/NamespaceControl';
import { SearchControl } from '../../../../providers/Filter/components/Filter/components/SearchControl';
import { getClusterSettings } from '../../../../utils/getClusterSettings';
import { ManageCDPipelineDialog } from '../../../../widgets/dialogs/ManageCDPipeline';
import { useTypedPermissions } from '../../hooks/useTypedPermissions';
import { useDynamicDataContext } from '../../providers/DynamicData/hooks';
import { useColumns } from './hooks/useColumns';
import { CDPipelineListProps } from './types';

export const CDPipelineList = ({ filterFunction, blockerComponent }: CDPipelineListProps) => {
  const columns = useColumns();

  const { setDialog } = useDialogContext();

  const permissions = useTypedPermissions();
  const { CDPipelines } = useDynamicDataContext();

  return (
    <Table
      id={TABLES.CDPIPELINE_LIST.id}
      name={TABLES.CDPIPELINE_LIST.name}
      isLoading={CDPipelines.isLoading && (!CDPipelines.errors || !CDPipelines.errors.length)}
      data={CDPipelines.data}
      errors={CDPipelines.errors}
      columns={columns}
      filterFunction={filterFunction}
      blockerComponent={blockerComponent}
      emptyListComponent={
        permissions?.create?.CDPipeline.allowed ? (
          <EmptyList
            missingItemName={'Deployment Flows'}
            handleClick={() => {
              setDialog(ManageCDPipelineDialog, {
                CDPipelineData: null,
              });
            }}
            description={
              'Take the first step towards managing your Deployment Flow by adding a new environment here.'
            }
          />
        ) : (
          <EmptyList customText={permissions?.create?.CDPipeline.reason} />
        )
      }
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
  );
};
