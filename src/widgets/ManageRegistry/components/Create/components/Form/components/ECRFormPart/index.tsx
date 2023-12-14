import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { IrsaRoleArn } from '../../../../../fields';
import { AWSRegion } from '../../../../../fields/AWSRegion';

export const ECRFormPart = () => {
    return (
        <>
            <Grid item xs={12}>
                <AWSRegion />
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant={'h6'}>Authentication</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <IrsaRoleArn />
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};
