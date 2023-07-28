import { Grid } from '@material-ui/core';
import React from 'react';
import { Name, Password, RegistryEndpoint, User } from '../fields';

export const Form = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={6}>
                        <RegistryEndpoint />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={6}>
                <User />
            </Grid>
            <Grid item xs={6}>
                <Password />
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={6}>
                        <Name />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
