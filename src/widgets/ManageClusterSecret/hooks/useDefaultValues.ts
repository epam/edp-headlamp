import React from 'react';
import { CLUSTER_CREATION_FORM_NAMES } from '../names';
import { ManageClusterSecretDataContext } from '../types';

const parseConfigJson = (configJson: string) => {
    const decodedConfigJson = atob(unescape(configJson));
    return JSON.parse(decodedConfigJson);
};

export const useDefaultValues = ({ formData }: { formData: ManageClusterSecretDataContext }) => {
    const { currentElement } = formData;

    const isPlaceholder = typeof currentElement === 'string' && currentElement === 'placeholder';

    return React.useMemo(() => {
        if (isPlaceholder) {
            return {};
        }

        const config = parseConfigJson(currentElement?.data?.config);

        return {
            [CLUSTER_CREATION_FORM_NAMES.clusterName.name]: atob(
                unescape(currentElement?.data?.name)
            ),
            [CLUSTER_CREATION_FORM_NAMES.clusterHost.name]: atob(
                unescape(currentElement?.data?.server)
            ),
            [CLUSTER_CREATION_FORM_NAMES.clusterToken.name]: config?.bearerToken,
            [CLUSTER_CREATION_FORM_NAMES.clusterCertificate.name]: config?.tlsClientConfig?.caData,
        };
    }, [currentElement, isPlaceholder]);
};
