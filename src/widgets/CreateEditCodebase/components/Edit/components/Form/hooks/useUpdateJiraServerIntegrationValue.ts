import React from 'react';
import { useFormContext } from 'react-hook-form';
import { CODEBASE_FORM_NAMES } from '../../../../../names';
import { EditCodebaseFormValues } from '../../../types';

export const useUpdateJiraServerIntegrationValue = (): void => {
    const { watch, setValue } = useFormContext<EditCodebaseFormValues>();
    const jiraServerFieldValue = watch(CODEBASE_FORM_NAMES.jiraServer.name);

    React.useEffect(() => {
        if (jiraServerFieldValue) {
            setValue(CODEBASE_FORM_NAMES.hasJiraServerIntegration.name, true, {
                shouldDirty: false,
            });
        }
    }, [jiraServerFieldValue, setValue]);
};
