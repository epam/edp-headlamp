import React from 'react';
import { useForm } from 'react-hook-form';
import { CRUD_TYPES } from '../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../hooks/useResourceCRUDMutation';
import { JiraServerKubeObject } from '../../../k8s/groups/EDP/JiraServer';
import { JiraServerKubeObjectInterface } from '../../../k8s/groups/EDP/JiraServer/types';
import { JIRA_SERVER_FORM_NAMES } from '../names';
import { JiraServerFormValues } from '../types';

export const useJiraServerEditForm = ({
  jiraServer,
  handleClosePanel,
}: {
  jiraServer: JiraServerKubeObjectInterface;
  handleClosePanel: () => void;
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
    [handleClosePanel, jiraServer, jiraServerEditMutation]
  );

  return React.useMemo(
    () => ({ form, mutation: jiraServerEditMutation, handleSubmit }),
    [form, jiraServerEditMutation, handleSubmit]
  );
};
