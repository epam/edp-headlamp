import React from 'react';
import { safeDecode } from '../../../utils/decodeEncode';
import { SONAR_INTEGRATION_SECRET_FORM_NAMES } from '../names';
import { ManageSonarIntegrationSecretFormDataContext } from '../types';

export const useDefaultValues = ({
    formData,
}: {
    formData: ManageSonarIntegrationSecretFormDataContext;
}) => {
    const { currentElement } = formData;

    const isPlaceholder = typeof currentElement === 'string' && currentElement === 'placeholder';

    return React.useMemo(() => {
        if (isPlaceholder) {
            return {};
        }

        return {
            [SONAR_INTEGRATION_SECRET_FORM_NAMES.token.name]: safeDecode(
                currentElement?.data?.token
            ),
            [SONAR_INTEGRATION_SECRET_FORM_NAMES.url.name]: safeDecode(currentElement?.data?.url),
        };
    }, [currentElement, isPlaceholder]);
};
