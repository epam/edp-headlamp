import { Grid } from '@mui/material';
import React from 'react';
import { ExternalURL, Token, URL } from '../../../fields';

export const Form = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <ExternalURL />
      </Grid>
      <Grid item xs={12}>
        <URL />
      </Grid>
      <Grid item xs={12}>
        <Token />
      </Grid>
    </Grid>
  );
};
