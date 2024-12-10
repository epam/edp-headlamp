import React from 'react';
import { useForm } from 'react-hook-form';
import { CRUD_TYPES } from '../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../hooks/useResourceCRUDMutation';
import { JiraServerKubeObject } from '../../../k8s/groups/EDP/JiraServer';
import { JiraServerKubeObjectInterface } from '../../../k8s/groups/EDP/JiraServer/types';
import { FORM_MODES } from '../../../types/forms';
import { JIRA_SERVER_FORM_NAMES } from '../names';
import { JiraServerFormValues, WidgetPermissions } from '../types';

export const useJiraServerEditForm = ({
  jiraServer,
  handleClosePanel,
  permissions,
}: {
  jiraServer: JiraServerKubeObjectInterface;
  handleClosePanel: () => void;
  permissions: WidgetPermissions;
}) => {
  const jiraServerEditMutation = useResourceCRUDMutation<
    JiraServerKubeObjectInterface,
    CRUD_TYPES.EDIT
  >('jiraServerEditMutation', JiraServerKubeObject, CRUD_TYPES.EDIT);

  const defaultValues = React.useMemo(
    () => ({
      [JIRA_SERVER_FORM_NAMES.url.name]: jiraServer?.spec.apiUrl || jiraServer?.spec.rootUrl,
    }),
    [jiraServer?.spec.apiUrl, jiraServer?.spec.rootUrl]
  );

  const form = useForm<JiraServerFormValues>({
    defaultValues: defaultValues,
  });

  React.useEffect(() => {
    form.reset(defaultValues, { keepDirty: false });
  }, [defaultValues, form]);

  const handleSubmit = React.useCallback(
    async (values: JiraServerFormValues) => {
      if (!permissions?.update?.JiraServer.allowed) {
        return false;
      }

      const { url } = values;

      const newJiraServerData = {
        ...jiraServer,
        spec: {
          ...jiraServer.spec,
          apiUrl: url,
          rootUrl: url,
        },
      };

      jiraServerEditMutation.mutate(newJiraServerData, {
        onSuccess: () => handleClosePanel(),
      });
    },
    [handleClosePanel, jiraServer, jiraServerEditMutation, permissions?.update?.JiraServer.allowed]
  );

  return React.useMemo(
    () => ({
      mode: FORM_MODES.EDIT,
      form,
      onSubmit: form.handleSubmit(handleSubmit),
      isSubmitting: jiraServerEditMutation.isLoading,
      allowedToSubmit: {
        isAllowed: permissions?.update?.JiraServer.allowed,
        reason: permissions?.update?.JiraServer.reason,
      },
    }),
    [
      form,
      handleSubmit,
      jiraServerEditMutation.isLoading,
      permissions?.update?.JiraServer.allowed,
      permissions?.update?.JiraServer.reason,
    ]
  );
};
