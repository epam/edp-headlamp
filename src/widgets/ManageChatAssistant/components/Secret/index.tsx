import { Grid } from '@mui/material';
import React from 'react';
import { ApiUrl, AssistantId, Token } from './fields';

export const SecretForm = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <ApiUrl />
      </Grid>
      <Grid item xs={6}>
        <AssistantId />
      </Grid>
      <Grid item xs={12}>
        <Token />
      </Grid>
    </Grid>
  );
};
