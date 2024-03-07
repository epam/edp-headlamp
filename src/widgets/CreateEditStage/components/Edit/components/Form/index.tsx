import { Grid } from '@mui/material';
import React from 'react';
import { TriggerTemplate, TriggerType } from '../../../fields';

export const Form = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TriggerType />
      </Grid>
      <Grid item xs={6}>
        <TriggerTemplate />
      </Grid>
    </Grid>
  );
};
