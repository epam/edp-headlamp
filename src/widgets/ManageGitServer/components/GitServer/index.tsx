import { Grid, useTheme } from '@mui/material';
import React from 'react';
import {
  GitProvider,
  HostName,
  HTTPSPort,
  Name,
  OverrideWebhookURL,
  SkipWebHookSSL,
  SSHPort,
  UserName,
  WebHookURL,
} from './components/fields';

export const GitServerForm = () => {
  const theme = useTheme();

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6} sx={{ mt: theme.typography.pxToRem(16) }}>
          <Name />
        </Grid>
        <Grid item xs={6}>
          <GitProvider />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <HostName />
            </Grid>
            <Grid item xs={6}>
              <UserName />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <SSHPort />
            </Grid>
            <Grid item xs={6}>
              <HTTPSPort />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6} sx={{ mt: '16px' }}>
              <OverrideWebhookURL />
            </Grid>
            <Grid item xs={6}>
              <WebHookURL />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <SkipWebHookSSL />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
