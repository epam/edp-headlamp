import { Grid } from '@material-ui/core';
import React from 'react';
import { Applications } from '../../../../../FormFields/CDPipelineFields';
import { ApplicationsFormPartProps } from './types';

export const ApplicationsFormPart = ({
    names,
    handleFormFieldChange,
}: ApplicationsFormPartProps) => {
    return (
        <Grid container spacing={3}>
            <Applications names={names} handleFormFieldChange={handleFormFieldChange} />
        </Grid>
    );
};
