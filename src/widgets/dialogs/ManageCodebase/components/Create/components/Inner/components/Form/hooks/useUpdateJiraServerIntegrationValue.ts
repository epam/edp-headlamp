import React from 'react';
import { useTypedFormContext } from '../../../../../../../hooks/useFormContext';
import { CODEBASE_FORM_NAMES } from '../../../../../../../names';

export const useUpdateJiraServerIntegrationValue = () => {
  const { watch, setValue } = useTypedFormContext();

  const jiraServerFieldValue = watch(CODEBASE_FORM_NAMES.jiraServer.name);

  React.useEffect(() => {
    if (!jiraServerFieldValue) {
      return;
    }

    setValue(CODEBASE_FORM_NAMES.hasJiraServerIntegration.name, true, { shouldDirty: false });
  }, [jiraServerFieldValue, setValue]);
};
