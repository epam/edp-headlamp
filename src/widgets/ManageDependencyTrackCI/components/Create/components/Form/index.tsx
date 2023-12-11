import { Grid } from '@material-ui/core';
import React from 'react';
import { Token, URL } from '../../../fields';

export const Form = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <URL />
            </Grid>
            <Grid item xs={12}>
                <Token />
            </Grid>
        </Grid>
    );
};
