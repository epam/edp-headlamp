import React from 'react';
import { safeDecode } from '../../../utils/decodeEncode';
import { DEPENDENCY_TRACK_INTEGRATION_SECRET_FORM_NAMES } from '../names';
import { ManageDependencyTrackIntegrationSecretFormDataContext } from '../types';

export const useDefaultValues = ({
    formData,
}: {
    formData: ManageDependencyTrackIntegrationSecretFormDataContext;
}) => {
    const { currentElement } = formData;

    const isPlaceholder = typeof currentElement === 'string' && currentElement === 'placeholder';

    return React.useMemo(() => {
        if (isPlaceholder) {
            return {};
        }

        return {
            [DEPENDENCY_TRACK_INTEGRATION_SECRET_FORM_NAMES.token.name]: safeDecode(
                currentElement?.data?.token
            ),
            [DEPENDENCY_TRACK_INTEGRATION_SECRET_FORM_NAMES.url.name]: safeDecode(
                currentElement?.data?.url
            ),
        };
    }, [currentElement, isPlaceholder]);
};
