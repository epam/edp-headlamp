import React from 'react';
import { safeDecode } from '../../../utils/decodeEncode';
import { CONTAINER_REGISTRY_ITEM_OPTIONS } from '../constants';
import { HARBOR_REGISTRY_SECRET_FORM_NAMES } from '../names';
import { ManageHarborRegistryFormDataContext } from '../types';

const parseConfigJson = (configJson: string) => {
    const decodedConfigJson = safeDecode(configJson);
    return JSON.parse(decodedConfigJson);
};

export const useDefaultValues = ({
    formData,
}: {
    formData: ManageHarborRegistryFormDataContext;
}) => {
    const {
        currentElement,
        registryEndpoint: configMapRegistryEndpoint,
        registrySpace: configMapRegistrySpace,
        secrets,
    } = formData;

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
                [HARBOR_REGISTRY_SECRET_FORM_NAMES.registryHost.name]: configMapRegistryEndpoint,
                [HARBOR_REGISTRY_SECRET_FORM_NAMES.registrySpace.name]: configMapRegistrySpace,
                [HARBOR_REGISTRY_SECRET_FORM_NAMES.user.name]: '',
                [HARBOR_REGISTRY_SECRET_FORM_NAMES.password.name]: '',
                [HARBOR_REGISTRY_SECRET_FORM_NAMES.name.name]: typeOptions.filter(
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
            [HARBOR_REGISTRY_SECRET_FORM_NAMES.name.name]: currentElement?.metadata.name,
            [HARBOR_REGISTRY_SECRET_FORM_NAMES.registryHost.name]: registryEndpoint,
            [HARBOR_REGISTRY_SECRET_FORM_NAMES.registrySpace.name]: configMapRegistrySpace,
            [HARBOR_REGISTRY_SECRET_FORM_NAMES.user.name]: userName,
            [HARBOR_REGISTRY_SECRET_FORM_NAMES.password.name]: password,
        };
    }, [configMapRegistryEndpoint, configMapRegistrySpace, currentElement, typeOptions]);
};
