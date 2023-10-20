import React from 'react';
import { safeDecode } from '../../../utils/decodeEncode';
import { HARBOR_REGISTRY_SECRET_FORM_NAMES } from '../../ManageHarborRegistry/names';
import { CONTAINER_REGISTRY_ITEM_OPTIONS } from '../constants';
import { DOCKERHUB_REGISTRY_SECRET_FORM_NAMES } from '../names';
import { ManageDockerHubRegistryFormDataContext } from '../types';

const parseConfigJson = (configJson: string) => {
    const decodedConfigJson = safeDecode(configJson);
    return JSON.parse(decodedConfigJson);
};

export const useDefaultValues = ({
    formData,
}: {
    formData: ManageDockerHubRegistryFormDataContext;
}) => {
    const { currentElement, secrets, registrySpace: configMapRegistrySpace } = formData;

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
        if (typeof currentElement === 'string' && currentElement === 'placeholder') {
            return {
                [DOCKERHUB_REGISTRY_SECRET_FORM_NAMES.registryHost.name]:
                    'https://index.docker.io/v1/',
                [HARBOR_REGISTRY_SECRET_FORM_NAMES.registrySpace.name]: configMapRegistrySpace,
                [DOCKERHUB_REGISTRY_SECRET_FORM_NAMES.user.name]: '',
                [DOCKERHUB_REGISTRY_SECRET_FORM_NAMES.password.name]: '',
                [DOCKERHUB_REGISTRY_SECRET_FORM_NAMES.name.name]: typeOptions.filter(
                    el => !el.disabled
                )?.[0]?.value,
            };
        }

        const configJson = currentElement?.data?.['.dockerconfigjson'];
        const parsedConfigJson = parseConfigJson(configJson);
        const registryEndpoint = Object.keys(parsedConfigJson?.auths)?.[0];
        // @ts-ignore
        const userName = Object.values(parsedConfigJson.auths)[0]?.username;
        // @ts-ignore
        const password = Object.values(parsedConfigJson.auths)[0]?.password;

        return {
            [DOCKERHUB_REGISTRY_SECRET_FORM_NAMES.name.name]: currentElement?.metadata.name,
            [DOCKERHUB_REGISTRY_SECRET_FORM_NAMES.registryHost.name]: registryEndpoint,
            [HARBOR_REGISTRY_SECRET_FORM_NAMES.registrySpace.name]: configMapRegistrySpace,

            [DOCKERHUB_REGISTRY_SECRET_FORM_NAMES.user.name]: userName,
            [DOCKERHUB_REGISTRY_SECRET_FORM_NAMES.password.name]: password,
        };
    }, [configMapRegistrySpace, currentElement, typeOptions]);
};
