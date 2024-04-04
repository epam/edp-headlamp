import { Icon } from '@iconify/react';
import { Grid, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { GIT_PROVIDERS } from '../../../../constants/gitProviders';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { useGitServerFormsContext } from '../../hooks/useGitServerFormsContext';
import { GIT_SERVER_FORM_NAMES } from '../../names';
import { SSHPrivateKey, SSHPublicKey, Token } from './components/fields';
import { CredentialsFormProps } from './types';

export const CredentialsForm = ({ gitServerSecret }: CredentialsFormProps) => {
  const { sharedForm } = useGitServerFormsContext();

  const gitServerSecretOwnerReference = gitServerSecret?.metadata?.ownerReferences?.[0].kind;

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
      <Grid item xs={12}>
        <Grid container spacing={1} alignItems={'center'}>
          <Grid item>
            <Typography variant={'h6'}>Credentials</Typography>
          </Grid>
          {!!gitServerSecretOwnerReference && (
            <Grid item>
              <Tooltip title={`Managed by ${gitServerSecretOwnerReference}`}>
                <Icon
                  icon={ICONS.CLOUD_LOCK}
                  width={20}
                  style={{
                    display: 'block',
                  }}
                />
              </Tooltip>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {secretFieldsRenderer()}
        </Grid>
      </Grid>
    </Grid>
  );
};
