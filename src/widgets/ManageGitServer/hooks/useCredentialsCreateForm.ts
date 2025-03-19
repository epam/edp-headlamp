import React from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { CRUD_TYPE } from '../../../constants/crudTypes';
import { GIT_PROVIDER } from '../../../constants/gitProviders';
import { useResourceCRUDMutation } from '../../../hooks/useResourceCRUDMutation';
import { SecretKubeObject } from '../../../k8s/groups/default/Secret';
import { SecretKubeObjectInterface } from '../../../k8s/groups/default/Secret/types';
import {
  createBitbucketGitServerSecretInstance,
  createGerritGitServerSecretInstance,
  createGithubGitServerSecretInstance,
  createGitlabGitServerSecretInstance,
} from '../../../k8s/groups/default/Secret/utils/createGitServerSecretInstance';
import { FormItem } from '../../../providers/MultiForm/types';
import { FORM_MODES } from '../../../types/forms';
import { GIT_USER } from '../constants';
import { CredentialsFormValues, SharedFormValues, WidgetPermissions } from '../types';

export const useCredentialsCreateForm = ({
  sharedForm,
  permissions,
}: {
  sharedForm: UseFormReturn<SharedFormValues, any, undefined>;
  permissions: WidgetPermissions;
}): FormItem => {
  const createMutation = useResourceCRUDMutation<SecretKubeObjectInterface, typeof CRUD_TYPE.CREATE>(
    'gitServerCreateMutation',
    SecretKubeObject,
    CRUD_TYPE.CREATE
  );

  const form = useForm<CredentialsFormValues>();

  const handleSubmit = React.useCallback(
    async (values: CredentialsFormValues) => {
      if (!permissions.create.Secret.allowed) {
        return false;
      }

      const sharedValues = sharedForm.getValues();

      const newGitServerSecret = (() => {
        switch (sharedValues.gitProvider) {
          case GIT_PROVIDER.GERRIT:
            return createGerritGitServerSecretInstance({
              sshPrivateKey: values.sshPrivateKey,
              sshPublicKey: values.sshPublicKey,
              username: GIT_USER.GERRIT,
            });
          case GIT_PROVIDER.GITHUB:
            return createGithubGitServerSecretInstance({
              sshPrivateKey: values.sshPrivateKey,
              token: values.token,
              username: GIT_USER.GITHUB,
            });
          case GIT_PROVIDER.GITLAB:
            return createGitlabGitServerSecretInstance({
              sshPrivateKey: values.sshPrivateKey,
              token: values.token,
            });
          case GIT_PROVIDER.BITBUCKET:
            return createBitbucketGitServerSecretInstance({
              sshPrivateKey: values.sshPrivateKey,
              token: values.token,
            });
          default:
            break;
        }
      })();
      createMutation.mutate(newGitServerSecret);
    },
    [permissions.create.Secret.allowed, sharedForm, createMutation]
  );

  return React.useMemo(
    () => ({
      mode: FORM_MODES.CREATE,
      form,
      onSubmit: form.handleSubmit(handleSubmit),
      isSubmitting: createMutation.isLoading,
      allowedToSubmit: {
        isAllowed: permissions.create.Secret.allowed,
        reason: permissions.create.Secret.reason,
      },
    }),
    [
      form,
      handleSubmit,
      createMutation.isLoading,
      permissions.create.Secret.allowed,
      permissions.create.Secret.reason,
    ]
  );
};
