import { Icon } from '@iconify/react';
import { Button, Tooltip, Typography } from '@material-ui/core';
import React from 'react';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { useDialogContext } from '../../../../providers/Dialog/hooks';
import { FORM_MODES } from '../../../../types/forms';
import { CREATE_EDIT_STAGE_DIALOG_NAME } from '../../../../widgets/CreateEditStage/constants';
import { CreateEditStageDialogForwardedProps } from '../../../../widgets/CreateEditStage/types';
import { useCDPipelineContext } from '../../providers/CDPipeline/hooks';
import { useEnrichedApplicationsContext } from '../../providers/EnrichedApplications/hooks';
import { TableHeaderActionsProps } from './types';

export const TableHeaderActions = ({ CDPipelineStages }: TableHeaderActionsProps) => {
    const { CDPipeline } = useCDPipelineContext();
    const { enrichedApplications } = useEnrichedApplicationsContext();
    const ciTool = enrichedApplications?.[0]?.application?.spec.ciTool;
    const { setDialog } = useDialogContext<CreateEditStageDialogForwardedProps>();

    return (
        <>
            <Tooltip title={'Create stage'}>
                <Button
                    startIcon={<Icon icon={ICONS['DOCUMENT_ADD']} />}
                    onClick={() =>
                        setDialog({
                            modalName: CREATE_EDIT_STAGE_DIALOG_NAME,
                            forwardedProps: {
                                CDPipelineData: CDPipeline,
                                otherStages: CDPipelineStages,
                                mode: FORM_MODES.CREATE,
                                ciTool,
                            },
                        })
                    }
                >
                    <Typography>Create</Typography>
                </Button>
            </Tooltip>
        </>
    );
};
