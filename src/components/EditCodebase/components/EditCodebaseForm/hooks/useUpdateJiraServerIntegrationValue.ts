import React from 'react';
import { FormNameObject } from '../../../../../types/forms';

interface UseUpdateJiraServerIntegrationValueProps {
    watch: (name: string) => string;
    setValue: (name: string, value: any) => void;
    names: { [key: string]: FormNameObject };
}

export const useUpdateJiraServerIntegrationValue = ({
    watch,
    setValue,
    names,
}: UseUpdateJiraServerIntegrationValueProps): void => {
    const jiraServerFieldValue = watch(names.jiraServer.name);

    React.useEffect(() => {
        if (jiraServerFieldValue) {
            setValue(names.hasJiraServerIntegration.name, true);
        }
    }, [jiraServerFieldValue, names.hasJiraServerIntegration.name, setValue]);
};
