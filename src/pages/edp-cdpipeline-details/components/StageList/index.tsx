import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { EmptyList } from '../../../../components/EmptyList';
import { Table } from '../../../../components/Table';
import { useDialogContext } from '../../../../providers/Dialog/hooks';
import { FORM_MODES } from '../../../../types/forms';
import { CREATE_EDIT_STAGE_DIALOG_NAME } from '../../../../widgets/CreateEditStage/constants';
import { CreateEditStageDialogForwardedProps } from '../../../../widgets/CreateEditStage/types';
import { useCDPipelineContext } from '../../providers/CDPipeline/hooks';
import { useCDPipelineStagesContext } from '../../providers/CDPipelineStages/hooks';
import { useEnrichedApplicationsContext } from '../../providers/EnrichedApplications/hooks';
import { TableHeaderActions } from '../TableHeaderActions';
import { useColumns } from './hooks/useColumns';
import { useStyles } from './styles';

export const StageList = () => {
    const classes = useStyles();
    const columns = useColumns(classes);
    const { stages } = useCDPipelineStagesContext();
    const { CDPipeline } = useCDPipelineContext();

    const { setDialog } = useDialogContext();

    const { enrichedApplications } = useEnrichedApplicationsContext();

    const createEditStageDialogForwardedProps: CreateEditStageDialogForwardedProps = React.useMemo(
        () => ({
            mode: FORM_MODES.CREATE,
            ciTool: enrichedApplications?.[0]?.application.spec.ciTool,
            otherStages: stages,
            CDPipelineData: CDPipeline,
        }),
        [CDPipeline, enrichedApplications, stages]
    );

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Grid container spacing={1} alignItems={'center'} justifyContent={'space-between'}>
                    <Grid item>
                        <Typography variant={'h5'}>Stages</Typography>
                    </Grid>
                    <Grid item>
                        <TableHeaderActions CDPipelineStages={stages} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Table
                    columns={columns}
                    data={stages}
                    isLoading={!stages}
                    emptyListComponent={
                        <EmptyList
                            missingItemName={'stages'}
                            handleClick={() => {
                                setDialog({
                                    modalName: CREATE_EDIT_STAGE_DIALOG_NAME,
                                    forwardedProps: createEditStageDialogForwardedProps,
                                });
                            }}
                        />
                    }
                />
            </Grid>
        </Grid>
    );
};
