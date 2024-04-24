import React from 'react';
import { safeDecode } from '../../../../../utils/decodeEncode';
import { JIRA_CI_FORM_NAMES } from '../../../names';
import { ManageJiraCIFormDataContext, ManageJiraCIFormValues } from '../../../types';

export const useDefaultValues = ({ formData }: { formData: ManageJiraCIFormDataContext }) => {
  const { jiraServerSecret, jiraServer } = formData;

  return React.useMemo(() => {
    const base: Partial<ManageJiraCIFormValues> = {
      [JIRA_CI_FORM_NAMES.url.name]: jiraServer?.spec.apiUrl || jiraServer?.spec.rootUrl,
      [JIRA_CI_FORM_NAMES.username.name]: safeDecode(jiraServerSecret?.data?.username),
      [JIRA_CI_FORM_NAMES.password.name]: safeDecode(jiraServerSecret?.data?.password),
    };

    return base;
  }, [jiraServer, jiraServerSecret]);
};
