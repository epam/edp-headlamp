import React from 'react';
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
            [DEPENDENCY_TRACK_INTEGRATION_SECRET_FORM_NAMES.token.name]: atob(
                unescape(currentElement?.data?.token)
            ),
        };
    }, [currentElement, isPlaceholder]);
};
