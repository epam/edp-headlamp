import React from 'react';
import { REGISTRY_SECRET_CREATION_FORM_NAMES } from '../names';
import { ManageRegistrySecretFormDataContext } from '../types';

const parseConfigJson = (configJson: string) => {
    const decodedConfigJson = atob(unescape(configJson));
    return JSON.parse(decodedConfigJson);
};

export const useDefaultValues = ({
    formData,
}: {
    formData: ManageRegistrySecretFormDataContext;
}) => {
    const { currentElement, registryEndpoint: dockerRegistryEndpoint } = formData;

    const getUserNameAndPassword = React.useCallback(() => {
        if (typeof currentElement === 'string' && currentElement === 'placeholder') {
            return { userName: undefined, password: undefined };
        }
        const configJson = currentElement?.data?.['.dockerconfigjson'];

        if (configJson) {
            const parsedConfigJson = parseConfigJson(configJson);
            // @ts-ignore
            const userName = Object.values(parsedConfigJson.auths)[0]?.username;
            // @ts-ignore
            const password = Object.values(parsedConfigJson.auths)[0]?.password;
            return { userName, password };
        } else {
            return { userName: undefined, password: undefined };
        }
    }, [currentElement]);

    const getRegistryEndpoint = React.useCallback(() => {
        if (typeof currentElement === 'string' && currentElement === 'placeholder') {
            return dockerRegistryEndpoint;
        }
        const configJson = currentElement?.data?.['.dockerconfigjson'];
        if (configJson) {
            const parsedConfigJson = parseConfigJson(configJson);
            // @ts-ignore
            const endpoint = Object.keys(parsedConfigJson?.auths)?.[0];

            return endpoint || dockerRegistryEndpoint;
        } else {
            return dockerRegistryEndpoint;
        }
    }, [currentElement, dockerRegistryEndpoint]);

    const { userName, password } = getUserNameAndPassword();
    const registryEndpoint = getRegistryEndpoint();

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
