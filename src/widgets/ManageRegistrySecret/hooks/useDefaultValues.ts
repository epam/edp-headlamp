import React from 'react';
import { useEDPComponentsURLsQuery } from '../../../k8s/EDPComponent/hooks/useEDPComponentsURLsQuery';
import { safeDecode } from '../../../utils/decodeEncode';
import { CONTAINER_REGISTRY_ITEM_OPTIONS } from '../constants';
import { REGISTRY_SECRET_FORM_NAMES } from '../names';
import { ManageRegistrySecretFormDataContext } from '../types';

const parseConfigJson = (configJson: string) => {
    const decodedConfigJson = safeDecode(configJson);
    return JSON.parse(decodedConfigJson);
};

export const useDefaultValues = ({
    formData,
}: {
    formData: ManageRegistrySecretFormDataContext;
}) => {
    const { currentElement, registryEndpoint: dockerRegistryEndpoint, secrets } = formData;
    const { data: EDPComponentsURLS, isLoading } = useEDPComponentsURLsQuery();
    const containerRegistryComponentURL = EDPComponentsURLS?.['container-registry'];
    const isDockerHubUsed = !isLoading && containerRegistryComponentURL?.includes('docker.io');

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
            return isDockerHubUsed ? 'https://index.docker.io/v1/' : dockerRegistryEndpoint;
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
    }, [currentElement, dockerRegistryEndpoint, isDockerHubUsed]);

    const { userName, password } = getUserNameAndPassword();
    const registryEndpoint = getRegistryEndpoint();

    const typeOptions = React.useMemo(
        () =>
            Object.values(CONTAINER_REGISTRY_ITEM_OPTIONS).map(({ label, value }) => {
                const alreadyExists = !!secrets?.find(secret => secret?.metadata?.name === value);

                return {
                    label: `${label} (${value})`,
                    value: value,
                    disabled: alreadyExists,
                };
            }),
        [secrets]
    );

    return React.useMemo(() => {
        return {
            [REGISTRY_SECRET_FORM_NAMES.name.name]:
                typeof currentElement === 'string' && currentElement === 'placeholder'
                    ? typeOptions.filter(el => !el.disabled)?.[0]?.value
                    : currentElement?.metadata.name,
            [REGISTRY_SECRET_FORM_NAMES.registryEndpoint.name]: registryEndpoint,
            [REGISTRY_SECRET_FORM_NAMES.user.name]: userName,
            [REGISTRY_SECRET_FORM_NAMES.password.name]: password,
        };
    }, [currentElement, password, registryEndpoint, typeOptions, userName]);
};
