import { Grid } from '@mui/material';
import { Alert } from '@mui/material';
import React from 'react';
import { useFormContext } from '../../../../../../providers/Form/hooks';
import { ManageArgoCDIntegrationSecretFormDataContext } from '../../../../types';
import { ExternalURL, Token, URL } from '../../../fields';

export const Form = () => {
  const {
    formData: { argoCDQuickLink },
  } = useFormContext<ManageArgoCDIntegrationSecretFormDataContext>();

  return (
    <Grid container spacing={2}>
      {!argoCDQuickLink && (
        <Grid item xs={12}>
          <Alert severity="info" variant="outlined">
            Argo CD QuickLink has not been found. Please, create it first in order to manage the
            integration.
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
