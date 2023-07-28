import React from 'react';
import { useFormContext } from 'react-hook-form';
import { CODEBASE_FORM_NAMES } from '../../../../../../../names';
import { CreateCodebaseFormValues } from '../../../../../types';

export const useUpdateJiraServerIntegrationValue = () => {
    const { watch, setValue } = useFormContext<CreateCodebaseFormValues>();

    const jiraServerFieldValue = watch(CODEBASE_FORM_NAMES.jiraServer.name);

    React.useEffect(() => {
        if (!jiraServerFieldValue) {
            return;
        }

        setValue(CODEBASE_FORM_NAMES.hasJiraServerIntegration.name, true, { shouldDirty: false });
    }, [jiraServerFieldValue, setValue]);
};
