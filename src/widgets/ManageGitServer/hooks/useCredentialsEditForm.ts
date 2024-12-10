import React from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { CRUD_TYPES } from '../../../constants/crudTypes';
import { GIT_PROVIDERS } from '../../../constants/gitProviders';
import { useResourceCRUDMutation } from '../../../hooks/useResourceCRUDMutation';
import { editResource } from '../../../k8s/common/editResource';
import { SecretKubeObject } from '../../../k8s/groups/default/Secret';
import { SecretKubeObjectInterface } from '../../../k8s/groups/default/Secret/types';
import { FormItem } from '../../../providers/MultiForm/types';
import { FORM_MODES } from '../../../types/forms';
import { safeDecode, safeEncode } from '../../../utils/decodeEncode';
import {
  CREDENTIALS_FORM_NAME,
  GIT_SERVER_BITBUCKET_SECRET_FORM_NAMES,
  GIT_SERVER_GERRIT_SECRET_FORM_NAMES,
  GIT_SERVER_GITHUB_SECRET_FORM_NAMES,
  GIT_SERVER_GITLAB_SECRET_FORM_NAMES,
} from '../names';
import { CredentialsFormValues, SharedFormValues, WidgetPermissions } from '../types';

export const useCredentialsEditForm = ({
  sharedForm,
  gitServerSecret,
  permissions,
}: {
  sharedForm: UseFormReturn<SharedFormValues, any, undefined>;
  gitServerSecret: SecretKubeObjectInterface;
  permissions: WidgetPermissions;
}): FormItem => {
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

    const sharedValues = sharedForm.getValues();

    switch (sharedValues.gitProvider) {
      case GIT_PROVIDERS.GERRIT:
        base = {
          ...base,
          [CREDENTIALS_FORM_NAME.sshPrivateKey.name]: safeDecode(gitServerSecret?.data['id_rsa']),
          [CREDENTIALS_FORM_NAME.sshPublicKey.name]: safeDecode(
            gitServerSecret?.data['id_rsa.pub']
          ),
        };
        break;
      case GIT_PROVIDERS.GITLAB:
        base = {
          ...base,
          [CREDENTIALS_FORM_NAME.sshPrivateKey.name]: safeDecode(gitServerSecret?.data['id_rsa']),
          [CREDENTIALS_FORM_NAME.token.name]: safeDecode(gitServerSecret?.data.token),
        };
        break;
      case GIT_PROVIDERS.GITHUB:
        base = {
          ...base,
          [CREDENTIALS_FORM_NAME.sshPrivateKey.name]: safeDecode(gitServerSecret?.data['id_rsa']),
          [CREDENTIALS_FORM_NAME.token.name]: safeDecode(gitServerSecret?.data.token),
        };
        break;
      case GIT_PROVIDERS.BITBUCKET:
        base = {
          ...base,
          [CREDENTIALS_FORM_NAME.sshPrivateKey.name]: safeDecode(gitServerSecret?.data['id_rsa']),
          [CREDENTIALS_FORM_NAME.token.name]: safeDecode(gitServerSecret?.data.token),
        };
        break;
      default:
        break;
    }

    return base;
  }, [gitServerSecret, sharedForm]);

  const form = useForm<CredentialsFormValues>({
    defaultValues: defaultValues,
  });

  React.useEffect(() => {
    form.reset(defaultValues, { keepDirty: false });
  }, [defaultValues, form]);

  const handleSubmit = React.useCallback(
    async (values: CredentialsFormValues) => {
      if (!permissions?.update?.Secret.allowed) {
        return false;
      }

      const sharedValues = sharedForm.getValues();

      const newGitServerSecret = (() => {
        switch (sharedValues.gitProvider) {
          case GIT_PROVIDERS.GERRIT:
            return editResource(GIT_SERVER_GERRIT_SECRET_FORM_NAMES, gitServerSecret, {
              sshPrivateKey: safeEncode(values.sshPrivateKey),
              sshPublicKey: safeEncode(values.sshPublicKey),
              gitUser: safeEncode(sharedValues.gitUser),
            });
          case GIT_PROVIDERS.GITHUB:
            return editResource(GIT_SERVER_GITHUB_SECRET_FORM_NAMES, gitServerSecret, {
              sshPrivateKey: safeEncode(values.sshPrivateKey),
              token: safeEncode(values.token),
              gitUser: safeEncode(sharedValues.gitUser),
            });
          case GIT_PROVIDERS.GITLAB:
            return editResource(GIT_SERVER_GITLAB_SECRET_FORM_NAMES, gitServerSecret, {
              sshPrivateKey: safeEncode(values.sshPrivateKey),
              token: safeEncode(values.token),
            });
          case GIT_PROVIDERS.BITBUCKET:
            return editResource(GIT_SERVER_BITBUCKET_SECRET_FORM_NAMES, gitServerSecret, {
              sshPrivateKey: safeEncode(values.sshPrivateKey),
              token: safeEncode(values.token),
            });
          default:
            break;
        }
      })();
      editMutation.mutate(newGitServerSecret);
    },
    [permissions?.update?.Secret.allowed, sharedForm, editMutation, gitServerSecret]
  );

  return React.useMemo(
    () => ({
      mode: FORM_MODES.EDIT,
      form,
      onSubmit: form.handleSubmit(handleSubmit),
      isSubmitting: editMutation.isLoading,
      allowedToSubmit: {
        isAllowed: permissions?.update?.Secret.allowed,
        reason: permissions?.update?.Secret.reason,
      },
    }),
    [
      form,
      handleSubmit,
      editMutation.isLoading,
      permissions?.update?.Secret.allowed,
      permissions?.update?.Secret.reason,
    ]
  );
};
