import React from 'react';
import { safeDecode } from '../../../utils/decodeEncode';
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
            [DEFECT_DOJO_INTEGRATION_SECRET_FORM_NAMES.token.name]: safeDecode(
                currentElement?.data?.token
            ),
            [DEFECT_DOJO_INTEGRATION_SECRET_FORM_NAMES.url.name]: safeDecode(
                currentElement?.data?.url
            ),
        };
    }, [currentElement, isPlaceholder]);
};
