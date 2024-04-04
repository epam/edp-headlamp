import React from 'react';
import { useForm } from 'react-hook-form';
import { CRUD_TYPES } from '../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../hooks/useResourceCRUDMutation';
import { editResource } from '../../../k8s/common/editResource';
import { EDPGitServerKubeObject } from '../../../k8s/EDPGitServer';
import { EDPGitServerKubeObjectInterface } from '../../../k8s/EDPGitServer/types';
import { getUsedValues } from '../../../utils/forms/getUsedValues';
import { GIT_SERVER_FORM_NAMES } from '../names';
import { GitServerFormValues } from '../types';

export const useGitServerEditForm = ({
  gitServer,
}: {
  gitServer: EDPGitServerKubeObjectInterface;
}) => {
  const editMutation = useResourceCRUDMutation<EDPGitServerKubeObjectInterface, CRUD_TYPES.EDIT>(
    'gitServerEditMutation',
    EDPGitServerKubeObject,
    CRUD_TYPES.EDIT
  );

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
        gitServer.spec.skipWebhookSSLVerification || '',
    };
  }, [gitServer]);

  const form = useForm<GitServerFormValues>({
    defaultValues: defaultValues,
  });

  React.useEffect(() => {
    form.reset(defaultValues, { keepDirty: false });
  }, [defaultValues, form]);

  const handleSubmit = React.useCallback(
    async (values: GitServerFormValues) => {
      const transformedValues = {
        ...values,
        sshPort: Number(values.sshPort),
        httpsPort: Number(values.httpsPort),
      };
      const gitServerValues = getUsedValues(transformedValues, GIT_SERVER_FORM_NAMES);

      const newGitServer = editResource(GIT_SERVER_FORM_NAMES, gitServer, gitServerValues);
      editMutation.mutate(newGitServer);
    },
    [gitServer, editMutation]
  );

  return React.useMemo(
    () => ({ form, mutation: editMutation, handleSubmit }),
    [form, editMutation, handleSubmit]
  );
};
