import React from 'react';
import { DEFECT_DOJO_INTEGRATION_SECRET_FORM_NAMES } from '../names';
import { ManageDefectDojoIntegrationSecretFormDataContext } from '../types';

export const useDefaultValues = ({
    formData,
}: {
    formData: ManageDefectDojoIntegrationSecretFormDataContext;
}) => {
    const { currentElement } = formData;

    const isPlaceholder = typeof currentElement === 'string' && currentElement === 'placeholder';

    return React.useMemo(() => {
        if (isPlaceholder) {
            return {};
        }

        return {
            [DEFECT_DOJO_INTEGRATION_SECRET_FORM_NAMES.token.name]: atob(
                unescape(currentElement?.data?.token)
            ),
            [DEFECT_DOJO_INTEGRATION_SECRET_FORM_NAMES.url.name]: atob(
                unescape(currentElement?.data?.url)
            ),
        };
    }, [currentElement, isPlaceholder]);
};
