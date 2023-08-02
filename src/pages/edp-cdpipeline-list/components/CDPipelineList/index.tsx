import { Utils } from '@kinvolk/headlamp-plugin/lib';
import React from 'react';
import { EmptyList } from '../../../../components/EmptyList';
import { Table } from '../../../../components/Table';
import { useDialogContext } from '../../../../providers/Dialog/hooks';
import { FORM_MODES } from '../../../../types/forms';
import { CREATE_EDIT_CD_PIPELINE_DIALOG_NAME } from '../../../../widgets/CreateEditCDPipeline/constants';
import { useColumns } from './hooks/useColumns';
import { CDPipelineListProps } from './types';

export const CDPipelineList = ({ CDPipelines, error }: CDPipelineListProps) => {
    const columns = useColumns();
    const filterFunc = Utils.useFilterFunc();

    const { setDialog } = useDialogContext();

    return (
        <Table
            isLoading={!CDPipelines}
            data={CDPipelines}
            error={error?.toString()}
            columns={columns}
            filterFunction={filterFunc}
            emptyListComponent={
                <EmptyList
                    missingItemName={'CD Pipelines'}
                    handleClick={() => {
                        setDialog({
                            modalName: CREATE_EDIT_CD_PIPELINE_DIALOG_NAME,
                            forwardedProps: {
                                mode: FORM_MODES.CREATE,
                            },
                        });
                    }}
                    description={
                        'Take the first step towards managing your environments by adding a new one here.'
                    }
                />
            }
        />
    );
};
