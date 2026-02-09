import { Grid } from '@mui/material';
import React from 'react';
import { CleanTemplate, DeployTemplate, TriggerType } from '../../../fields';

export const Form = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TriggerType />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <DeployTemplate />
      </Grid>
      <Grid item xs={6}>
        <CleanTemplate />
      </Grid>
    </Grid>
  );
};
