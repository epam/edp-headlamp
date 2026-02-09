import { Grid } from '@mui/material';
import React from 'react';
import { BuildPipeline, ReviewPipeline } from '../../../fields';

export const Form = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <ReviewPipeline />
      </Grid>
      <Grid item xs={12}>
        <BuildPipeline />
      </Grid>
    </Grid>
  );
};
