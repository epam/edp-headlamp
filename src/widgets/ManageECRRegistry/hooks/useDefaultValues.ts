import React from 'react';
import { REGISTRY_SECRET_NAMES } from '../../../k8s/Secret/constants';
import { ECR_REGISTRY_FORM_NAMES } from '../names';
import { ManageECRRegistryFormDataContext } from '../types';

export const useDefaultValues = ({ formData }: { formData: ManageECRRegistryFormDataContext }) => {
    const { currentElement, registryEndpoint, registrySpace, irsaRoleArn } = formData;

    return React.useMemo(() => {
        if (typeof currentElement === 'string' && currentElement === 'placeholder') {
            return {
                [ECR_REGISTRY_FORM_NAMES.registryHost.name]: registryEndpoint,
                [ECR_REGISTRY_FORM_NAMES.registrySpace.name]: registrySpace,
                [ECR_REGISTRY_FORM_NAMES.irsaRoleArn.name]: irsaRoleArn,
                [ECR_REGISTRY_FORM_NAMES.name.name]: REGISTRY_SECRET_NAMES.KANIKO_DOCKER_CONFIG,
            };
        }

        return {
            [ECR_REGISTRY_FORM_NAMES.registryHost.name]: registryEndpoint,
            [ECR_REGISTRY_FORM_NAMES.registrySpace.name]: registrySpace,
            [ECR_REGISTRY_FORM_NAMES.irsaRoleArn.name]: irsaRoleArn,
            [ECR_REGISTRY_FORM_NAMES.name.name]: currentElement?.metadata.name,
        };
    }, [currentElement, irsaRoleArn, registryEndpoint, registrySpace]);
};
