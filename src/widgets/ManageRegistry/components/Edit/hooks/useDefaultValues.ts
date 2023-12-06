import React from 'react';
import { CONTAINER_REGISTRY_TYPE } from '../../../../../k8s/ConfigMap/constants';
import { SecretKubeObjectInterface } from '../../../../../k8s/Secret/types';
import { safeDecode } from '../../../../../utils/decodeEncode';
import { REGISTRY_NAMES } from '../../../names';
import { ManageRegistryDataContext } from '../../../types';

const parseConfigJson = (configJson: string) => {
    const decodedConfigJson = safeDecode(configJson);
    return JSON.parse(decodedConfigJson);
};

const getUsernameAndPassword = (secret: SecretKubeObjectInterface) => {
    if (!secret) {
        return { userName: undefined, password: undefined };
    }

    const configJson = secret?.data?.['.dockerconfigjson'];
    const parsedConfigJson = parseConfigJson(configJson);
    // @ts-ignore
    const userName = Object.values(parsedConfigJson.auths)[0]?.username;
    // @ts-ignore
    const password = Object.values(parsedConfigJson.auths)[0]?.password;
    return { userName, password };
};

export const useDefaultValues = ({ formData }: { formData: ManageRegistryDataContext }) => {
    const { EDPConfigMap, tektonServiceAccount, pullAccountSecret, pushAccountSecret } = formData;

    const registryHost = EDPConfigMap?.data?.container_registry_host;
    const registrySpace = EDPConfigMap?.data?.container_registry_space;
    const registryType = EDPConfigMap?.data?.container_registry_type;
    const awsRegion = EDPConfigMap?.data?.aws_region;

    const handleECR = React.useCallback(() => {
        const irsaRoleArn =
            tektonServiceAccount?.metadata?.annotations?.['eks.amazonaws.com/role-arn'];

        return {
            [REGISTRY_NAMES.REGISTRY_TYPE]: registryType,
            [REGISTRY_NAMES.REGISTRY_HOST]: registryHost,
            [REGISTRY_NAMES.REGISTRY_SPACE]: registrySpace,
            [REGISTRY_NAMES.IRSA_ROLE_ARN]: irsaRoleArn,
            [REGISTRY_NAMES.AWS_REGION]: awsRegion,
        };
    }, [
        awsRegion,
        registryHost,
        registrySpace,
        registryType,
        tektonServiceAccount?.metadata?.annotations,
    ]);

    const handleDockerHubOrHarbor = React.useCallback(() => {
        const { userName: pullUserName, password: pullPassword } =
            getUsernameAndPassword(pullAccountSecret);
        const { userName: pushUserName, password: pushPassword } =
            getUsernameAndPassword(pushAccountSecret);

        return {
            [REGISTRY_NAMES.REGISTRY_TYPE]: registryType,
            [REGISTRY_NAMES.REGISTRY_HOST]: registryHost,
            [REGISTRY_NAMES.REGISTRY_SPACE]: registrySpace,
            [REGISTRY_NAMES.PUSH_ACCOUNT_USER]: pushUserName,
            [REGISTRY_NAMES.PUSH_ACCOUNT_PASSWORD]: pushPassword,
            [REGISTRY_NAMES.PULL_ACCOUNT_USER]: pullUserName,
            [REGISTRY_NAMES.PULL_ACCOUNT_PASSWORD]: pullPassword,
            [REGISTRY_NAMES.USE_SAME_ACCOUNT]: !pullUserName && !pullPassword,
        };
    }, [pullAccountSecret, pushAccountSecret, registryHost, registrySpace, registryType]);

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
};
