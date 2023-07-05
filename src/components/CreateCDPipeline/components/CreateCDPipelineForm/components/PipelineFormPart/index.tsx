import { Grid } from '@material-ui/core';
import React from 'react';
import { DeploymentType, PipelineName } from '../../../../../FormFields/CDPipelineFields';
import { PipelineInfoFormPartProps } from './types';

export const PipelineInfoFormPart = ({
    names,
    handleFormFieldChange,
    onPipelineNameChange,
}: PipelineInfoFormPartProps) => {
    return (
        <Grid container spacing={2}>
            <PipelineName
                names={names}
                handleFormFieldChange={handleFormFieldChange}
                onPipelineNameChange={onPipelineNameChange}
            />
            <DeploymentType names={names} handleFormFieldChange={handleFormFieldChange} />
        </Grid>
    );
};
