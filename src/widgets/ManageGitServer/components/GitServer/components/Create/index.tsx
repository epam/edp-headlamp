import { Grid } from '@mui/material';
import React from 'react';
import {
  GitProvider,
  HostName,
  HTTPSPort,
  Name,
  SkipWebHookSSL,
  SSHPort,
  UserName,
} from '../fields';

export const Create = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
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
