import { Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';
import { Stages } from '../../../../../../components/FormFields/CDPipelineFields';
import { Render } from '../../../../../../components/Render';
import { StagesFormPartProps } from './types';

export const StagesFormPart = ({
    stages,
    setCreateStageDialogOpen,
    onStageDelete,
}: StagesFormPartProps) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Stages
                    stages={stages}
                    setCreateStageDialogOpen={setCreateStageDialogOpen}
                    onStageDelete={onStageDelete}
                />
            </Grid>

            <Render condition={stages && !stages.length}>
                <Grid item xs={12}>
                    <Alert severity="info" elevation={2} variant="filled">
                        Add at least one stage
                    </Alert>
                </Grid>
            </Render>
        </Grid>
    );
};
