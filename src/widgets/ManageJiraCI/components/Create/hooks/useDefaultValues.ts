import React from 'react';
import { JIRA_CI_FORM_NAMES } from '../../../names';
import { ManageJiraCIFormDataContext, ManageJiraCIFormValues } from '../../../types';

export const useDefaultValues = ({ formData }: { formData: ManageJiraCIFormDataContext }) => {
  const { jiraServer } = formData;

  return React.useMemo(() => {
    const base: Partial<ManageJiraCIFormValues> = {
      [JIRA_CI_FORM_NAMES.url.name]: jiraServer?.spec.apiUrl || jiraServer?.spec.rootUrl,
    };

    return base;
  }, [jiraServer]);
};
