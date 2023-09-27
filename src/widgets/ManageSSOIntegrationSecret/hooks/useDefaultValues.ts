import React from 'react';
import { safeDecode } from '../../../utils/decodeEncode';
import { SSO_INTEGRATION_SECRET_FORM_NAMES } from '../names';
import { ManageSSOIntegrationSecretFormDataContext } from '../types';

export const useDefaultValues = ({
    formData,
}: {
    formData: ManageSSOIntegrationSecretFormDataContext;
}) => {
    const { currentElement } = formData;

    const isPlaceholder = typeof currentElement === 'string' && currentElement === 'placeholder';

    return React.useMemo(() => {
        if (isPlaceholder) {
            return {};
        }

        return {
            [SSO_INTEGRATION_SECRET_FORM_NAMES.username.name]: safeDecode(
                currentElement?.data?.username
            ),
            [SSO_INTEGRATION_SECRET_FORM_NAMES.password.name]: safeDecode(
                currentElement?.data?.password
            ),
        };
    }, [currentElement, isPlaceholder]);
};
