import { Alert, Grid, Stack } from '@mui/material';
import React from 'react';
import { useDataContext } from '../../providers/Data/hooks';
import { ExternalURL } from './fields/ExternalURL';

export const QuickLinkForm = () => {
  const { quickLink } = useDataContext();

  return (
    <Stack spacing={2}>
      {!quickLink && (
        <Grid item xs={12}>
          <Alert severity="info" variant="outlined">
            SonarQube QuickLink has not been found. Please, create it first in order to manage the
            integration.
          </Alert>
        </Grid>
      )}
      <ExternalURL />
    </Stack>
  );
};
