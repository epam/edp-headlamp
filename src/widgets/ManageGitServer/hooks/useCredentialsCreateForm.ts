import React from 'react';
import { useForm } from 'react-hook-form';
import { CRUD_TYPES } from '../../../constants/crudTypes';
import { GIT_PROVIDERS } from '../../../constants/gitProviders';
import { useResourceCRUDMutation } from '../../../hooks/useResourceCRUDMutation';
import { SecretKubeObject } from '../../../k8s/Secret';
import { SecretKubeObjectInterface } from '../../../k8s/Secret/types';
import {
  createGerritGitServerSecretInstance,
  createGithubGitServerSecretInstance,
  createGitlabGitServerSecretInstance,
} from '../../../k8s/Secret/utils/createGitServerSecretInstance';
import { CredentialsFormValues } from '../types';

export const useCredentialsCreateForm = ({
  chosenGitProvider,
}: {
  chosenGitProvider: GIT_PROVIDERS;
}) => {
  const createMutation = useResourceCRUDMutation<SecretKubeObjectInterface, CRUD_TYPES.CREATE>(
    'gitServerCreateMutation',
    SecretKubeObject,
    CRUD_TYPES.CREATE
  );

  const form = useForm<CredentialsFormValues>();

  const handleSubmit = React.useCallback(
    async (values: CredentialsFormValues) => {
      const newGitServerSecret = (() => {
        switch (chosenGitProvider) {
          case GIT_PROVIDERS.GERRIT:
            return createGerritGitServerSecretInstance({
              sshPrivateKey: values.sshPrivateKey,
              sshPublicKey: values.sshPublicKey,
              username: 'edp-ci',
            });
          case GIT_PROVIDERS.GITHUB:
            return createGithubGitServerSecretInstance({
              sshPrivateKey: values.sshPrivateKey,
              token: values.token,
              username: 'git',
            });
          case GIT_PROVIDERS.GITLAB:
            return createGitlabGitServerSecretInstance({
              sshPrivateKey: values.sshPrivateKey,
              token: 'git',
            });
          default:
            break;
        }
      })();
      createMutation.mutate(newGitServerSecret);
    },
    [createMutation, chosenGitProvider]
  );

  return React.useMemo(
    () => ({ form, mutation: createMutation, handleSubmit }),
    [form, createMutation, handleSubmit]
  );
};
