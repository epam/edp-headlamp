import React from 'react';
import { CONTAINER_REGISTRY_TYPE } from '../../../../../k8s/ConfigMap/constants';
import { REGISTRY_NAMES } from '../../../names';
import { ManageRegistryDataContext } from '../../../types';

export const useDefaultValues = ({ formData }: { formData: ManageRegistryDataContext }) => {
    const { EDPConfigMap, tektonServiceAccount } = formData;

    const registryHost = EDPConfigMap?.data?.container_registry_host;
    const registrySpace = EDPConfigMap?.data?.container_registry_space;
    const registryType = EDPConfigMap?.data?.container_registry_type;

    const handleECR = React.useCallback(() => {
        const irsaRoleArn =
            tektonServiceAccount?.metadata?.annotations?.['eks.amazonaws.com/role-arn'];

        return {
            [REGISTRY_NAMES.REGISTRY_TYPE]: registryType,
            [REGISTRY_NAMES.REGISTRY_HOST]: registryHost,
            [REGISTRY_NAMES.REGISTRY_SPACE]: registrySpace,
            [REGISTRY_NAMES.IRSA_ROLE_ARN]: irsaRoleArn,
        };
    }, [registryHost, registrySpace, registryType, tektonServiceAccount]);

    const handleDockerHubOrHarbor = React.useCallback(() => {
        return {
            [REGISTRY_NAMES.REGISTRY_TYPE]: registryType,
            [REGISTRY_NAMES.REGISTRY_HOST]: registryHost,
            [REGISTRY_NAMES.REGISTRY_SPACE]: registrySpace,
            [REGISTRY_NAMES.USE_SAME_ACCOUNT]: true,
        };
    }, [registryHost, registrySpace, registryType]);

    return React.useMemo(() => {
        switch (registryType) {
            case CONTAINER_REGISTRY_TYPE.ECR:
                return handleECR();
            case CONTAINER_REGISTRY_TYPE.HARBOR:
                return handleDockerHubOrHarbor();
            case CONTAINER_REGISTRY_TYPE.DOCKER_HUB:
                return handleDockerHubOrHarbor();
            default:
                break;
        }
    }, [handleDockerHubOrHarbor, handleECR, registryType]);
};
