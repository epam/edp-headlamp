import React from 'react';
import { safeDecode } from '../../../utils/decodeEncode';
import { NEXUS_INTEGRATION_SECRET_FORM_NAMES } from '../names';
import { ManageNexusIntegrationSecretFormDataContext } from '../types';

export const useDefaultValues = ({
    formData,
}: {
    formData: ManageNexusIntegrationSecretFormDataContext;
}) => {
    const { currentElement } = formData;

    const isPlaceholder = typeof currentElement === 'string' && currentElement === 'placeholder';

    return React.useMemo(() => {
        if (isPlaceholder) {
            return {};
        }

        return {
            [NEXUS_INTEGRATION_SECRET_FORM_NAMES.username.name]: safeDecode(
                currentElement?.data?.username
            ),
            [NEXUS_INTEGRATION_SECRET_FORM_NAMES.password.name]: safeDecode(
                currentElement?.data?.password
            ),
            [NEXUS_INTEGRATION_SECRET_FORM_NAMES.url.name]: safeDecode(currentElement?.data?.url),
        };
    }, [currentElement, isPlaceholder]);
};
