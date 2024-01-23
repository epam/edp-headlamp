import { Grid } from '@mui/material';
import React from 'react';
import { ClusterCertificate, ClusterHost, ClusterName, ClusterToken } from '../../../fields';

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
        <Grid item xs={6}>
          <ClusterToken />
        </Grid>
        <Grid item xs={6}>
          <ClusterCertificate />
        </Grid>
      </Grid>
    </>
  );
};
