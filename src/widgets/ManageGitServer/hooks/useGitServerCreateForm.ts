import React from 'react';
import { useForm } from 'react-hook-form';
import { CRUD_TYPES } from '../../../constants/crudTypes';
import { GIT_PROVIDERS } from '../../../constants/gitProviders';
import { useResourceCRUDMutation } from '../../../hooks/useResourceCRUDMutation';
import { GitServerKubeObject } from '../../../k8s/groups/EDP/GitServer';
import { GitServerKubeObjectInterface } from '../../../k8s/groups/EDP/GitServer/types';
import { createGitServerInstance } from '../../../k8s/groups/EDP/GitServer/utils/createGitServerInstance';
import { getUsedValues } from '../../../utils/forms/getUsedValues';
import { GIT_USER } from '../constants';
import { GIT_SERVER_FORM_NAMES } from '../names';
import { GitServerFormValues } from '../types';

export const useGitServerCreateForm = ({ handleClosePanel }: { handleClosePanel: () => void }) => {
  const createMutation = useResourceCRUDMutation<GitServerKubeObjectInterface, CRUD_TYPES.CREATE>(
    'gitServerCreateMutation',
    GitServerKubeObject,
    CRUD_TYPES.CREATE
  );

  const defaultValues = React.useMemo(() => {
    return {
      [GIT_SERVER_FORM_NAMES.gitProvider.name]: GIT_PROVIDERS.GERRIT,
      [GIT_SERVER_FORM_NAMES.sshPort.name]: 22,
      [GIT_SERVER_FORM_NAMES.httpsPort.name]: 443,
      [GIT_SERVER_FORM_NAMES.gitUser.name]: GIT_USER.GERRIT,
    };
  }, []);

  const form = useForm<GitServerFormValues>({
    defaultValues: defaultValues,
  });

  const handleSubmit = React.useCallback(
    async (values: GitServerFormValues) => {
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
          handleClosePanel();
        },
      });
    },
    [createMutation, handleClosePanel]
  );

  return React.useMemo(
    () => ({ form, mutation: createMutation, handleSubmit }),
    [form, createMutation, handleSubmit]
  );
};
