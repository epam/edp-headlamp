import { Grid } from '@mui/material';
import React from 'react';
import { ApiUrl, TokenEndpoint } from './fields';

export const CodemieForm = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <ApiUrl />
      </Grid>
      <Grid item xs={6}>
        <TokenEndpoint />
      </Grid>
    </Grid>
  );
};
