import React from 'react';
import { JIRA_INTEGRATION_SECRET_FORM_NAMES } from '../names';
import { ManageJiraIntegrationSecretFormDataContext } from '../types';

export const useDefaultValues = ({
    formData,
}: {
    formData: ManageJiraIntegrationSecretFormDataContext;
}) => {
    const { currentElement } = formData;

    const isPlaceholder = typeof currentElement === 'string' && currentElement === 'placeholder';

    return React.useMemo(() => {
        if (isPlaceholder) {
            return {};
        }

        return {
            [JIRA_INTEGRATION_SECRET_FORM_NAMES.username.name]: atob(
                unescape(currentElement?.data?.username)
            ),
            [JIRA_INTEGRATION_SECRET_FORM_NAMES.password.name]: atob(
                unescape(currentElement?.data?.password)
            ),
        };
    }, [currentElement, isPlaceholder]);
};
