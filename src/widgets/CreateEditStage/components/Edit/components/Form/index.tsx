import { Grid } from '@mui/material';
import React from 'react';
import { TriggerType } from '../../../fields';

export const Form = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TriggerType />
      </Grid>
    </Grid>
  );
};
