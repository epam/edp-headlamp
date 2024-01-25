import { Grid } from '@mui/material';
import { Alert } from '@mui/material';
import React from 'react';
import { useFormContext } from '../../../../../../providers/Form/hooks';
import { ManageDependencyTrackIntegrationSecretFormDataContext } from '../../../../types';
import { ExternalURL, Token, URL } from '../../../fields';

export const Form = () => {
  const {
    formData: { ownerReference, depTrackEDPComponent },
  } = useFormContext<ManageDependencyTrackIntegrationSecretFormDataContext>();

  return (
    <Grid container spacing={2}>
      {!depTrackEDPComponent && (
        <Grid item xs={12}>
          <Alert severity="info" variant="outlined">
            DependencyTrack EDPComponent has not been found. Please, create it first in order to
            manage the integration.
          </Alert>
        </Grid>
      )}
      {ownerReference && (
        <Grid item xs={12}>
          <Alert severity="info" variant="outlined">
            Managed by {ownerReference}
          </Alert>
        </Grid>
      )}
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
