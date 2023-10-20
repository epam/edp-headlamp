import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { IrsaRoleArn, RegistryEndpoint, RegistrySpace } from '../fields';

export const Form = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <RegistryEndpoint />
            </Grid>
            <Grid item xs={6}>
                <RegistrySpace />
            </Grid>
            <Grid item xs={12}>
                <Typography variant={'h6'} gutterBottom>
                    Authentication
                </Typography>
                <IrsaRoleArn />
            </Grid>
        </Grid>
    );
};
