import { Grid } from '@material-ui/core';
import React from 'react';
import { TriggerType } from '../../../fields';
import { Namespace } from '../../../fields/Namespace';

export const Form = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Namespace />
            </Grid>
            <Grid item xs={12}>
                <TriggerType />
            </Grid>
        </Grid>
    );
};
