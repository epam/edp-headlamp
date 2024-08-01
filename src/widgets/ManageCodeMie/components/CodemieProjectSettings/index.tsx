import { Grid, Typography } from '@mui/material';
import React from 'react';
import { Alias, TokenName, Type, URL } from './fields';

export const CodemieProjectSettingsForm = () => {
  return (
    <>
      <Typography variant="h6">Settings</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Alias />
        </Grid>
        <Grid item xs={6}>
          <TokenName />
        </Grid>
        <Grid item xs={6}>
          <Type />
        </Grid>
        <Grid item xs={6}>
          <URL />
        </Grid>
      </Grid>
    </>
  );
};
