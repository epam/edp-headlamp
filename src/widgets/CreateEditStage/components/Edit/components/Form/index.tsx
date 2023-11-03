import { Grid } from '@material-ui/core';
import React from 'react';
import { TriggerType } from '../../../fields';

export const Form = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TriggerType />
            </Grid>
        </Grid>
    );
};
