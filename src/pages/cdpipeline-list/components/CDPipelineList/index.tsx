import React from 'react';
import { EmptyList } from '../../../../components/EmptyList';
import { Table } from '../../../../components/Table';
import { useDialogContext } from '../../../../providers/Dialog/hooks';
import { ManageCDPipelineDialog } from '../../../../widgets/dialogs/ManageCDPipeline';
import { usePermissionsContext } from '../../providers/Permissions/hooks';
import { useColumns } from './hooks/useColumns';
import { CDPipelineListProps } from './types';

export const CDPipelineList = ({
  CDPipelines,
  error,
  filterFunction,
  blockerComponent,
}: CDPipelineListProps) => {
  const columns = useColumns();

  const { setDialog } = useDialogContext();

  const { cdPipeline: CDPipelinePermissions } = usePermissionsContext();

  return (
    <Table
      isLoading={CDPipelines === null}
      data={CDPipelines}
      error={error}
      columns={columns}
      filterFunction={filterFunction}
      blockerComponent={blockerComponent}
      emptyListComponent={
        CDPipelinePermissions.create ? (
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
          <EmptyList customText="You do not have permission to create Deployment Flows." />
        )
      }
    />
  );
};
