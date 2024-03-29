import React from 'react';
import { useForm } from 'react-hook-form';
import { CRUD_TYPES } from '../../../constants/crudTypes';
import { GIT_PROVIDERS } from '../../../constants/gitProviders';
import { useResourceCRUDMutation } from '../../../hooks/useResourceCRUDMutation';
import { editResource } from '../../../k8s/common/editResource';
import { SecretKubeObject } from '../../../k8s/Secret';
import { SecretKubeObjectInterface } from '../../../k8s/Secret/types';
import { safeDecode, safeEncode } from '../../../utils/decodeEncode';
import {
  CREDENTIALS_FORM_NAME,
  GIT_SERVER_GERRIT_SECRET_FORM_NAMES,
  GIT_SERVER_GITHUB_SECRET_FORM_NAMES,
  GIT_SERVER_GITLAB_SECRET_FORM_NAMES,
} from '../names';
import { CredentialsFormValues } from '../types';

export const useCredentialsEditForm = ({
  chosenGitProvider,
  gitServerSecret,
}: {
  chosenGitProvider: GIT_PROVIDERS;
  gitServerSecret: SecretKubeObjectInterface;
}) => {
  const editMutation = useResourceCRUDMutation<SecretKubeObjectInterface, CRUD_TYPES.EDIT>(
    'secretEditMutation',
    SecretKubeObject,
    CRUD_TYPES.EDIT
  );

  const defaultValues = React.useMemo(() => {
    let base: Partial<CredentialsFormValues> = {};

    if (!gitServerSecret) {
      return base;
    }

    if (chosenGitProvider === GIT_PROVIDERS.GERRIT) {
      base = {
        ...base,
        [CREDENTIALS_FORM_NAME.sshPrivateKey.name]: safeDecode(gitServerSecret?.data['id_rsa']),
        [CREDENTIALS_FORM_NAME.sshPublicKey.name]: safeDecode(gitServerSecret?.data['id_rsa.pub']),
      };
    }

    if (chosenGitProvider === GIT_PROVIDERS.GITLAB) {
      base = {
        ...base,
        [CREDENTIALS_FORM_NAME.sshPrivateKey.name]: safeDecode(gitServerSecret?.data['id_rsa']),
        [CREDENTIALS_FORM_NAME.token.name]: safeDecode(gitServerSecret?.data.token),
      };
    }

    if (chosenGitProvider === GIT_PROVIDERS.GITHUB) {
      base = {
        ...base,
        [CREDENTIALS_FORM_NAME.sshPrivateKey.name]: safeDecode(gitServerSecret?.data['id_rsa']),
        [CREDENTIALS_FORM_NAME.token.name]: safeDecode(gitServerSecret?.data.token),
      };
    }

    return base;
  }, [chosenGitProvider, gitServerSecret]);

  const form = useForm<CredentialsFormValues>({
    defaultValues: defaultValues,
  });

  const handleSubmit = React.useCallback(
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
      editMutation.mutate(newGitServerSecret);
    },
    [gitServerSecret, editMutation, chosenGitProvider]
  );

  return React.useMemo(
    () => ({ form, mutation: editMutation, handleSubmit }),
    [form, editMutation, handleSubmit]
  );
};
