import React from 'react';
import { REGISTRY_SECRET_CREATION_FORM_NAMES } from '../names';
import { ManageRegistrySecretFormDataContext } from '../types';

export const useDefaultValues = ({
    formData,
}: {
    formData: ManageRegistrySecretFormDataContext;
}) => {
    const { currentElement, registryEndpoint } = formData;

    const getUserNameAndPassword = React.useCallback(() => {
        if (typeof currentElement === 'string' && currentElement === 'placeholder') {
            return { userName: undefined, password: undefined };
        }
        const configJson = currentElement?.data?.['config.json'];
        if (configJson) {
            const decodedConfigJson = atob(unescape(configJson));
            const parsedConfigJson = JSON.parse(decodedConfigJson);
            // @ts-ignore
            const userName = Object.values(parsedConfigJson.auths)[0]?.username;
            // @ts-ignore
            const password = Object.values(parsedConfigJson.auths)[0]?.password;
            return { userName, password };
        }
    }, [currentElement]);

    const { userName, password } = getUserNameAndPassword();

    return React.useMemo(() => {
        return {
            [REGISTRY_SECRET_CREATION_FORM_NAMES.name.name]:
                typeof currentElement !== 'string' && currentElement?.metadata.name,
            [REGISTRY_SECRET_CREATION_FORM_NAMES.registryEndpoint.name]: registryEndpoint,
            [REGISTRY_SECRET_CREATION_FORM_NAMES.user.name]: userName,
            [REGISTRY_SECRET_CREATION_FORM_NAMES.password.name]: password,
        };
    }, [currentElement, password, registryEndpoint, userName]);
};
