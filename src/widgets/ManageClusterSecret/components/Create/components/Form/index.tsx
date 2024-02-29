import { Grid, useTheme } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { CLUSTER_CREATION_FORM_NAMES } from '../../../../names';
import {
  ClusterCertificate,
  ClusterHost,
  ClusterName,
  ClusterToken,
  SkipTLSVerify,
} from '../../../fields';

export const Form = () => {
  const theme = useTheme();
  const { watch } = useFormContext();

  const skipTLSVerify = watch(CLUSTER_CREATION_FORM_NAMES.skipTLSVerify.name);

  return (
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
      <Grid item xs={12} sx={{ mt: theme.typography.pxToRem(20) }}>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item xs={6}>
            <SkipTLSVerify />
          </Grid>
          {!skipTLSVerify && (
            <Grid item xs={6}>
              <ClusterCertificate />
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};
