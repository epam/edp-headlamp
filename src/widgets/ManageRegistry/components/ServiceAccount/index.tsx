import { Grid, Typography } from '@mui/material';
import React from 'react';
import { IrsaRoleArn } from './fields';

export const ServiceAccountForm = () => {
  return (
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
  );
};
