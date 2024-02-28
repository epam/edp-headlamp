import { Grid } from '@mui/material';
import React from 'react';
import { ClusterHost, ClusterName, ClusterToken } from '../../../fields';

export const Form = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <ClusterName />
        </Grid>
        <Grid item xs={6}>
          <ClusterHost />
        </Grid>
        <Grid item xs={12}>
          <ClusterToken />
        </Grid>
      </Grid>
    </>
  );
};
