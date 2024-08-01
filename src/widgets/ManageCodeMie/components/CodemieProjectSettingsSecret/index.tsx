import { Grid } from '@mui/material';
import React from 'react';
import { Token } from './fields';

export const CodemieProjectSettingsSecretForm = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Token />
      </Grid>
    </Grid>
  );
};
