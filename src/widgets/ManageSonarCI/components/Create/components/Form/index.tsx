import { Grid } from '@material-ui/core';
import React from 'react';
import { Token, URL } from '../../../fields';

export const Form = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <URL />
            </Grid>
            <Grid item xs={6}>
                <Token />
            </Grid>
        </Grid>
    );
};
