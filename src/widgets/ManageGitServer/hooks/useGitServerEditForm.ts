import React from 'react';
import { useForm } from 'react-hook-form';
import { CRUD_TYPES } from '../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../hooks/useResourceCRUDMutation';
import { editResource } from '../../../k8s/common/editResource';
import { GitServerKubeObject } from '../../../k8s/groups/EDP/GitServer';
import { GitServerKubeObjectInterface } from '../../../k8s/groups/EDP/GitServer/types';
import { FormItem } from '../../../providers/MultiForm/types';
import { FORM_MODES } from '../../../types/forms';
import { getUsedValues } from '../../../utils/forms/getUsedValues';
import { GIT_SERVER_FORM_NAMES } from '../names';
import { GitServerFormValues, WidgetPermissions } from '../types';

export const useGitServerEditForm = ({
  gitServer,
  webhookURL,
  permissions,
}: {
  gitServer: GitServerKubeObjectInterface;
  webhookURL: string;
  permissions: WidgetPermissions;
}): FormItem => {
  const editMutation = useResourceCRUDMutation<GitServerKubeObjectInterface, CRUD_TYPES.EDIT>(
    'gitServerEditMutation',
    GitServerKubeObject,
    CRUD_TYPES.EDIT
  );

  const webhookURLValue = gitServer?.spec?.webhookUrl || webhookURL || '';

  const defaultValues = React.useMemo(() => {
    if (!gitServer) {
      return {};
    }

    return {
      [GIT_SERVER_FORM_NAMES.gitProvider.name]: gitServer.spec.gitProvider || '',
      [GIT_SERVER_FORM_NAMES.name.name]: gitServer.metadata.name || '',
      [GIT_SERVER_FORM_NAMES.sshPort.name]:
        gitServer.spec.sshPort || '' ? Number(gitServer.spec.sshPort) : '',
      [GIT_SERVER_FORM_NAMES.httpsPort.name]: gitServer.spec.httpsPort
        ? Number(gitServer.spec.httpsPort)
        : '',
      [GIT_SERVER_FORM_NAMES.gitUser.name]: gitServer.spec.gitUser || '',
      [GIT_SERVER_FORM_NAMES.gitHost.name]: gitServer.spec.gitHost || '',
      [GIT_SERVER_FORM_NAMES.skipWebhookSSLVerification.name]:
        gitServer.spec.skipWebhookSSLVerification || false,
      [GIT_SERVER_FORM_NAMES.overrideWebhookURL.name]: !!gitServer.spec?.webhookUrl,
      [GIT_SERVER_FORM_NAMES.webhookURL.name]: webhookURLValue,
    };
  }, [gitServer, webhookURLValue]);

  const form = useForm<GitServerFormValues>({
    defaultValues: defaultValues,
  });

  React.useEffect(() => {
    form.reset(defaultValues, { keepDirty: false });
  }, [defaultValues, form]);

  const handleSubmit = React.useCallback(
    async (values: GitServerFormValues) => {
      if (!permissions.update.GitServer.allowed) {
        return false;
      }

      const transformedValues = {
        ...values,
        sshPort: Number(values.sshPort),
        httpsPort: Number(values.httpsPort),
      };

      const { webhookURL, ...otherValues } = getUsedValues(
        transformedValues,
        GIT_SERVER_FORM_NAMES
      );

      delete gitServer.spec.webhookUrl;

      const gitServerValues = {
        ...otherValues,
        ...(values.overrideWebhookURL
          ? { [GIT_SERVER_FORM_NAMES.webhookURL.name]: webhookURL }
          : {}),
      };

      const newGitServer = editResource(GIT_SERVER_FORM_NAMES, gitServer, gitServerValues);
      editMutation.mutate(newGitServer);
    },
    [permissions.update.GitServer.allowed, gitServer, editMutation]
  );

  return React.useMemo(
    () => ({
      mode: FORM_MODES.EDIT,
      form,
      onSubmit: form.handleSubmit(handleSubmit),
      isSubmitting: editMutation.isLoading,
      allowedToSubmit: {
        isAllowed: permissions.update.GitServer.allowed,
        reason: permissions.update.GitServer.reason,
      },
    }),
    [
      form,
      handleSubmit,
      editMutation.isLoading,
      permissions.update.GitServer.allowed,
      permissions.update.GitServer.reason,
    ]
  );
};
