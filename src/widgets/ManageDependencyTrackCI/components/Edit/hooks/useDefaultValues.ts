import React from 'react';
import { safeDecode } from '../../../../../utils/decodeEncode';
import { DEPENDENCY_TRACK_INTEGRATION_SECRET_FORM_NAMES } from '../../../names';
import { ManageDependencyTrackIntegrationSecretFormDataContext } from '../../../types';

export const useDefaultValues = ({
    formData,
}: {
    formData: ManageDependencyTrackIntegrationSecretFormDataContext;
}) => {
    const { dependencyTrackSecret, depTrackEDPComponent } = formData;

    return React.useMemo(() => {
        return {
            [DEPENDENCY_TRACK_INTEGRATION_SECRET_FORM_NAMES.token.name]: safeDecode(
                dependencyTrackSecret?.data?.token
            ),
            [DEPENDENCY_TRACK_INTEGRATION_SECRET_FORM_NAMES.url.name]: safeDecode(
                dependencyTrackSecret?.data?.url
            ),
            [DEPENDENCY_TRACK_INTEGRATION_SECRET_FORM_NAMES.externalUrl.name]:
                depTrackEDPComponent?.spec.url,
        };
    }, [dependencyTrackSecret, depTrackEDPComponent]);
};
