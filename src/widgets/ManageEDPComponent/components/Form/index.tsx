import { Grid } from '@material-ui/core';
import React from 'react';
import { Icon, Name, URL } from '../fields';

export const Form = () => {
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Name />
                        </Grid>
                        <Grid item xs={6}>
                            <URL />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Icon />
                </Grid>
            </Grid>
        </>
    );
};
