import { Grid } from '@material-ui/core';
import React from 'react';
import { Password, URL, User } from '../../../fields';

export const Form = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <URL />
            </Grid>
            <Grid item xs={6}>
                <User />
            </Grid>
            <Grid item xs={6}>
                <Password />
            </Grid>
        </Grid>
    );
};
