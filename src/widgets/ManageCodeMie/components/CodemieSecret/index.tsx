import { Grid, Typography } from '@mui/material';
import React from 'react';
import { ClientId, ClientSecret } from './fields';

export const CodemieSecretForm = () => {
  return (
    <>
      <Typography variant="h6">Credentials</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <ClientId />
        </Grid>
        <Grid item xs={6}>
          <ClientSecret />
        </Grid>
      </Grid>
    </>
  );
};
