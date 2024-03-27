import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { CRUD_TYPES } from '../../../../../../constants/crudTypes';
import { GIT_PROVIDERS } from '../../../../../../constants/gitProviders';
import { useResourceCRUDMutation } from '../../../../../../hooks/useResourceCRUDMutation';
import { editResource } from '../../../../../../k8s/common/editResource';
import { SecretKubeObject } from '../../../../../../k8s/Secret';
import { SecretKubeObjectInterface } from '../../../../../../k8s/Secret/types';
import { useMultiFormContext } from '../../../../../../providers/MultiForm/hooks';
import { safeEncode } from '../../../../../../utils/decodeEncode';
import { useDataContext } from '../../../../providers/Data/hooks';
import {
  GIT_SERVER_GERRIT_SECRET_FORM_NAMES,
  GIT_SERVER_GITHUB_SECRET_FORM_NAMES,
  GIT_SERVER_GITLAB_SECRET_FORM_NAMES,
} from '../../names';
import { CredentialsFormValues } from '../../types';
import { Form } from './components/Form';
import { useDefaultValues } from './hooks/useDefaultValues';

export const Edit = ({ formRef }: { formRef: React.MutableRefObject<HTMLFormElement> }) => {
  const baseDefaultValues = useDefaultValues();

  const { chosenGitProvider, gitServerSecret } = useDataContext();

  const methods = useForm<CredentialsFormValues>({
    defaultValues: baseDefaultValues,
  });

  const secretEditMutation = useResourceCRUDMutation<SecretKubeObjectInterface, CRUD_TYPES.EDIT>(
    'secretEditMutation',
    SecretKubeObject,
    CRUD_TYPES.EDIT
  );

  const onSubmit = React.useCallback(
    async (values: CredentialsFormValues) => {
      const newGitServerSecret = (() => {
        switch (chosenGitProvider) {
          case GIT_PROVIDERS.GERRIT:
            return editResource(GIT_SERVER_GERRIT_SECRET_FORM_NAMES, gitServerSecret, {
              sshPrivateKey: safeEncode(values.sshPrivateKey),
              sshPublicKey: safeEncode(values.sshPublicKey),
              gitUser: safeEncode('edp-ci'),
            });
          case GIT_PROVIDERS.GITHUB:
            return editResource(GIT_SERVER_GITHUB_SECRET_FORM_NAMES, gitServerSecret, {
              sshPrivateKey: safeEncode(values.sshPrivateKey),
              token: safeEncode(values.token),
              gitUser: safeEncode('git'),
            });
          case GIT_PROVIDERS.GITLAB:
            return editResource(GIT_SERVER_GITLAB_SECRET_FORM_NAMES, gitServerSecret, {
              sshPrivateKey: safeEncode(values.sshPrivateKey),
              token: safeEncode('git'),
            });
          default:
            break;
        }
      })();
      secretEditMutation.mutate(newGitServerSecret);
    },
    [chosenGitProvider, gitServerSecret, secretEditMutation]
  );

  const { registerForm, unregisterForm } = useMultiFormContext();

  React.useEffect(() => {
    registerForm('credentialsEdit', methods);

    return () => {
      unregisterForm('credentialsEdit', methods);
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
