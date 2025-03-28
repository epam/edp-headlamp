import React from 'react';
import { useForm } from 'react-hook-form';
import { CRUD_TYPE } from '../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../hooks/useResourceCRUDMutation';
import { JiraServerKubeObject } from '../../../k8s/groups/EDP/JiraServer';
import { JiraServerKubeObjectInterface } from '../../../k8s/groups/EDP/JiraServer/types';
import { createJiraServerInstance } from '../../../k8s/groups/EDP/JiraServer/utils/createJiraServerInstance';
import { FormItem } from '../../../providers/MultiForm/types';
import { FORM_MODES } from '../../../types/forms';
import { JiraServerFormValues, WidgetPermissions } from '../types';

export const useJiraServerCreateForm = ({
  handleClosePanel,
  permissions,
}: {
  handleClosePanel: (() => void) | undefined;
  permissions: WidgetPermissions;
}): FormItem => {
  const jiraServerCreateMutation = useResourceCRUDMutation<
    JiraServerKubeObjectInterface,
    typeof CRUD_TYPE.CREATE
  >('jiraServerCreateMutation', JiraServerKubeObject, CRUD_TYPE.CREATE);

  const defaultValues = React.useMemo(() => ({}), []);

  const form = useForm<JiraServerFormValues>({
    defaultValues: defaultValues,
  });

  React.useEffect(() => {
    form.reset(defaultValues, { keepDirty: false });
  }, [defaultValues, form]);

  const handleSubmit = React.useCallback(
    async (values: JiraServerFormValues) => {
      if (!permissions.create.JiraServer.allowed) {
        return false;
      }

      const { url } = values;

      const newJiraServerData = createJiraServerInstance(url);

      jiraServerCreateMutation.mutate(newJiraServerData, {
        onSuccess: () => handleClosePanel && handleClosePanel(),
      });
    },
    [handleClosePanel, jiraServerCreateMutation, permissions.create.JiraServer.allowed]
  );

  return React.useMemo(
    () => ({
      mode: FORM_MODES.CREATE,
      form,
      onSubmit: form.handleSubmit(handleSubmit),
      isSubmitting: jiraServerCreateMutation.isLoading,
      allowedToSubmit: {
        isAllowed: permissions.create.JiraServer.allowed,
        reason: permissions.create.JiraServer.reason,
      },
    }),
    [
      form,
      handleSubmit,
      jiraServerCreateMutation.isLoading,
      permissions.create.JiraServer.allowed,
      permissions.create.JiraServer.reason,
    ]
  );
};
