import React from 'react';
import { safeDecode } from '../../../utils/decodeEncode';
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
            [JIRA_INTEGRATION_SECRET_FORM_NAMES.username.name]: safeDecode(
                currentElement?.data?.username
            ),
            [JIRA_INTEGRATION_SECRET_FORM_NAMES.password.name]: safeDecode(
                currentElement?.data?.password
            ),
            [JIRA_INTEGRATION_SECRET_FORM_NAMES.url.name]: safeDecode(currentElement?.data?.url),
        };
    }, [currentElement, isPlaceholder]);
};
