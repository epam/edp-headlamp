import { Grid, Typography } from '@mui/material';
import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { GIT_PROVIDERS } from '../../../../../../constants/gitProviders';
import { GIT_SERVER_FORM_NAMES } from '../../../../names';
import {
  GitProvider,
  HostName,
  HTTPSPort,
  SkipWebHookSSL,
  SSHPort,
  SSHPrivateKey,
  SSHPublicKey,
  Token,
  UserName,
} from '../../../fields';

export const Form = () => {
  const { watch } = useReactHookFormContext();

  const gitProviderFieldValue = watch(GIT_SERVER_FORM_NAMES.gitProvider.name);
  const secretFieldsRenderer = React.useCallback(() => {
    switch (gitProviderFieldValue) {
      case GIT_PROVIDERS.GERRIT:
        return (
          <>
            <Grid item xs={12}>
              <SSHPrivateKey />
            </Grid>
            <Grid item xs={12}>
              <SSHPublicKey />
            </Grid>
          </>
        );
      case GIT_PROVIDERS.GITHUB:
        return (
          <>
            <Grid item xs={12}>
              <SSHPrivateKey />
            </Grid>
            <Grid item xs={12}>
              <Token />
            </Grid>
          </>
        );
      case GIT_PROVIDERS.GITLAB:
        return (
          <>
            <Grid item xs={12}>
              <SSHPrivateKey />
            </Grid>
            <Grid item xs={12}>
              <Token />
            </Grid>
          </>
        );
    }
  }, [gitProviderFieldValue]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
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
        {gitProviderFieldValue && (
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid container spacing={1} alignItems={'center'}>
                  <Grid item>
                    <Typography variant={'h6'}>Credentials</Typography>
                  </Grid>
                </Grid>
              </Grid>
              {secretFieldsRenderer()}
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
};
