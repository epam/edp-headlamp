import React from 'react';
import { EmptyList } from '../../../../components/EmptyList';
import { Table } from '../../../../components/Table';
import { useDialogContext } from '../../../../providers/Dialog/hooks';
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
      isLoading={CDPipelines.isLoading}
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
    />
  );
};
