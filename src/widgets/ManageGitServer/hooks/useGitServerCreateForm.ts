import React from 'react';
import { useForm } from 'react-hook-form';
import { CRUD_TYPE } from '../../../constants/crudTypes';
import { GIT_PROVIDER } from '../../../constants/gitProviders';
import { useResourceCRUDMutation } from '../../../hooks/useResourceCRUDMutation';
import { GitServerKubeObject } from '../../../k8s/groups/EDP/GitServer';
import { GitServerKubeObjectInterface } from '../../../k8s/groups/EDP/GitServer/types';
import { createGitServerInstance } from '../../../k8s/groups/EDP/GitServer/utils/createGitServerInstance';
import { FormItem } from '../../../providers/MultiForm/types';
import { FORM_MODES } from '../../../types/forms';
import { getUsedValues } from '../../../utils/forms/getUsedValues';
import { GIT_USER } from '../constants';
import { GIT_SERVER_FORM_NAMES } from '../names';
import { GitServerFormValues, WidgetPermissions } from '../types';

export const useGitServerCreateForm = ({
  handleClosePanel,
  permissions,
}: {
  handleClosePanel: (() => void) | undefined;
  permissions: WidgetPermissions;
}): FormItem => {
  const createMutation = useResourceCRUDMutation<
    GitServerKubeObjectInterface,
    typeof CRUD_TYPE.CREATE
  >('gitServerCreateMutation', GitServerKubeObject, CRUD_TYPE.CREATE);

  const defaultValues = React.useMemo(() => {
    return {
      [GIT_SERVER_FORM_NAMES.gitProvider.name]: GIT_PROVIDER.GERRIT,
      [GIT_SERVER_FORM_NAMES.sshPort.name]: 22,
      [GIT_SERVER_FORM_NAMES.httpsPort.name]: 443,
      [GIT_SERVER_FORM_NAMES.gitUser.name]: GIT_USER.GERRIT,
      [GIT_SERVER_FORM_NAMES.skipWebhookSSLVerification.name]: false,
    };
  }, []);

  const form = useForm<GitServerFormValues>({
    defaultValues: defaultValues,
  });

  const handleSubmit = React.useCallback(
    async (values: GitServerFormValues) => {
      if (!permissions.create.GitServer.allowed) {
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

      const gitServerValues = {
        ...otherValues,
        ...(values.overrideWebhookURL
          ? { [GIT_SERVER_FORM_NAMES.webhookURL.name]: webhookURL }
          : {}),
      };

      const newGitServer = createGitServerInstance(GIT_SERVER_FORM_NAMES, gitServerValues);
      createMutation.mutate(newGitServer, {
        onSuccess: () => {
          handleClosePanel && handleClosePanel();
        },
      });
    },
    [createMutation, handleClosePanel, permissions.create.GitServer.allowed]
  );

  return React.useMemo(
    () => ({
      mode: FORM_MODES.CREATE,
      form,
      onSubmit: form.handleSubmit(handleSubmit),
      isSubmitting: createMutation.isLoading,
      allowedToSubmit: {
        isAllowed: permissions.create.GitServer.allowed,
        reason: permissions.create.GitServer.reason,
      },
    }),
    [
      form,
      handleSubmit,
      createMutation.isLoading,
      permissions.create.GitServer.allowed,
      permissions.create.GitServer.reason,
    ]
  );
};
