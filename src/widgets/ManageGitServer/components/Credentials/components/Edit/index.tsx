import { Grid } from '@mui/material';
import React from 'react';
import { GIT_PROVIDERS } from '../../../../../../constants/gitProviders';
import { useGitServerFormsContext } from '../../../../hooks/useGitServerFormsContext';
import { GIT_SERVER_FORM_NAMES } from '../../../../names';
import { SSHPrivateKey, SSHPublicKey, Token } from '../fields';

export const Edit = () => {
  const { sharedForm } = useGitServerFormsContext();

  const sharedGitProviderValue = sharedForm.watch(GIT_SERVER_FORM_NAMES.gitProvider.name);

  const secretFieldsRenderer = React.useCallback(() => {
    switch (sharedGitProviderValue) {
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
  }, [sharedGitProviderValue]);

  return (
    <Grid container spacing={2}>
      {secretFieldsRenderer()}
    </Grid>
  );
};
