import React from 'react';
import { safeDecode } from '../../../../../utils/decodeEncode';
import { JIRA_INTEGRATION_SECRET_FORM_NAMES } from '../../../names';
import { ManageJiraIntegrationSecretFormDataContext } from '../../../types';

export const useDefaultValues = ({
  formData,
}: {
  formData: ManageJiraIntegrationSecretFormDataContext;
}) => {
  const { jiraServerSecret } = formData;

  return React.useMemo(() => {
    return {
      [JIRA_INTEGRATION_SECRET_FORM_NAMES.username.name]: safeDecode(
        jiraServerSecret?.data?.username
      ),
      [JIRA_INTEGRATION_SECRET_FORM_NAMES.password.name]: safeDecode(
        jiraServerSecret?.data?.password
      ),
    };
  }, [jiraServerSecret]);
};
