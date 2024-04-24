import { Grid } from '@mui/material';
import React from 'react';
import { Token, URL } from './fields';

export const SecretForm = () => {
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
