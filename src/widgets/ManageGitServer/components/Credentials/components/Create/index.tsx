import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { CRUD_TYPES } from '../../../../../../constants/crudTypes';
import { GIT_PROVIDERS } from '../../../../../../constants/gitProviders';
import { useResourceCRUDMutation } from '../../../../../../hooks/useResourceCRUDMutation';
import { SecretKubeObject } from '../../../../../../k8s/Secret';
import { SecretKubeObjectInterface } from '../../../../../../k8s/Secret/types';
import {
  createGerritGitServerSecretInstance,
  createGithubGitServerSecretInstance,
  createGitlabGitServerSecretInstance,
} from '../../../../../../k8s/Secret/utils/createGitServerSecretInstance';
import { useMultiFormContext } from '../../../../../../providers/MultiForm/hooks';
import { useDataContext } from '../../../../providers/Data/hooks';
import { CredentialsFormValues } from '../../types';
import { Form } from './components/Form';

export const Create = ({ formRef }: { formRef: React.MutableRefObject<HTMLFormElement> }) => {
  const { chosenGitProvider } = useDataContext();

  const methods = useForm<CredentialsFormValues>();

  const secretCreateMutation = useResourceCRUDMutation<
    SecretKubeObjectInterface,
    CRUD_TYPES.CREATE
  >('gitServerCreateMutation', SecretKubeObject, CRUD_TYPES.CREATE);

  const onSubmit = React.useCallback(
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
      secretCreateMutation.mutate(newGitServerSecret);
    },
    [chosenGitProvider, secretCreateMutation]
  );

  const { registerForm, unregisterForm } = useMultiFormContext();

  React.useEffect(() => {
    registerForm('credentialsCreate', methods);

    return () => {
      unregisterForm('credentialsCreate', methods);
    };
  }, [methods, registerForm, unregisterForm]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} ref={formRef}>
        <Form />
      </form>
    </FormProvider>
  );
};
