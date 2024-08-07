import React from 'react';
import { EmptyList } from '../../../../components/EmptyList';
import { Table } from '../../../../components/Table';
import { useDialogContext } from '../../../../providers/Dialog/hooks';
import { FORM_MODES } from '../../../../types/forms';
import { CREATE_EDIT_CD_PIPELINE_DIALOG_NAME } from '../../../../widgets/CreateEditCDPipeline/constants';
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
              setDialog({
                modalName: CREATE_EDIT_CD_PIPELINE_DIALOG_NAME,
                forwardedProps: {
                  mode: FORM_MODES.CREATE,
                },
              });
            }}
            description={
              'Take the first step towards managing your Deployment Flows by adding a new one here.'
            }
          />
        ) : (
          <EmptyList customText="You do not have permission to create Deployment Flows." />
        )
      }
    />
  );
};
