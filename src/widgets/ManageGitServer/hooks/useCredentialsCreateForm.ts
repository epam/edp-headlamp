import React from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
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
import { CredentialsFormValues, SharedFormValues } from '../types';

export const useCredentialsCreateForm = ({
  sharedForm,
}: {
  sharedForm: UseFormReturn<SharedFormValues, any, undefined>;
}) => {
  const createMutation = useResourceCRUDMutation<SecretKubeObjectInterface, CRUD_TYPES.CREATE>(
    'gitServerCreateMutation',
    SecretKubeObject,
    CRUD_TYPES.CREATE
  );

  const form = useForm<CredentialsFormValues>();

  const handleSubmit = React.useCallback(
    async (values: CredentialsFormValues) => {
      const sharedValues = sharedForm.getValues();

      const newGitServerSecret = (() => {
        switch (sharedValues.gitProvider) {
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
    [sharedForm, createMutation]
  );

  return React.useMemo(
    () => ({ form, mutation: createMutation, handleSubmit }),
    [form, createMutation, handleSubmit]
  );
};
