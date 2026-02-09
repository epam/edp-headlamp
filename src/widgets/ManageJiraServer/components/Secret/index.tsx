import { Grid } from '@mui/material';
import React from 'react';
import { Password, User } from './fields';

export const SecretForm = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <User />
      </Grid>
      <Grid item xs={6}>
        <Password />
      </Grid>
    </Grid>
  );
};
