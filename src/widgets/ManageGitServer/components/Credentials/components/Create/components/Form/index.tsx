import { Grid } from '@mui/material';
import React from 'react';
import { GIT_PROVIDERS } from '../../../../../../../../constants/gitProviders';
import { useDataContext } from '../../../../../../providers/Data/hooks';
import { SSHPrivateKey, SSHPublicKey, Token } from '../../../fields';

export const Form = () => {
  const { chosenGitProvider } = useDataContext();

  const secretFieldsRenderer = React.useCallback(() => {
    switch (chosenGitProvider) {
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
  }, [chosenGitProvider]);

  return (
    <Grid container spacing={2}>
      {secretFieldsRenderer()}
    </Grid>
  );
};
