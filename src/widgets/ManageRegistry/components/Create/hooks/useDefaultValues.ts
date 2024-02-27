import { CONTAINER_REGISTRY_TYPE } from '../../../../../k8s/ConfigMap/constants';
import { ConfigMapKubeObjectInterface } from '../../../../../k8s/ConfigMap/types';
import { SecretKubeObjectInterface } from '../../../../../k8s/Secret/types';
import { ServiceAccountKubeObjectInterface } from '../../../../../k8s/ServiceAccount/types';
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

const getAuth = (secret: SecretKubeObjectInterface) => {
  if (!secret) {
    return { auth: undefined };
  }

  const configJson = secret?.data?.['.dockerconfigjson'];
  const parsedConfigJson = parseConfigJson(configJson);
  // @ts-ignore
  const auth = Object.values(parsedConfigJson.auths)[0]?.auth;
  return { auth };
};

const handleECR = (
  EDPConfigMap: ConfigMapKubeObjectInterface,
  tektonServiceAccount: ServiceAccountKubeObjectInterface
) => {
  return {
    [REGISTRY_NAMES.REGISTRY_TYPE]: EDPConfigMap?.data?.container_registry_type,
    [REGISTRY_NAMES.REGISTRY_HOST]: EDPConfigMap?.data?.container_registry_host,
    [REGISTRY_NAMES.REGISTRY_SPACE]: EDPConfigMap?.data?.container_registry_space,
    [REGISTRY_NAMES.IRSA_ROLE_ARN]:
      tektonServiceAccount?.metadata?.annotations?.['eks.amazonaws.com/role-arn'],
    [REGISTRY_NAMES.AWS_REGION]: EDPConfigMap?.data?.aws_region,
  };
};

const handleDockerHubOrHarborOrNexus = (
  EDPConfigMap: ConfigMapKubeObjectInterface,
  pushAccountSecret: SecretKubeObjectInterface,
  pullAccountSecret: SecretKubeObjectInterface
) => {
  const { userName: pullUserName, password: pullPassword } =
    getUsernameAndPassword(pullAccountSecret);
  const { userName: pushUserName, password: pushPassword } =
    getUsernameAndPassword(pushAccountSecret);

  return {
    [REGISTRY_NAMES.REGISTRY_TYPE]: EDPConfigMap?.data?.container_registry_type,
    [REGISTRY_NAMES.REGISTRY_HOST]: EDPConfigMap?.data?.container_registry_host,
    [REGISTRY_NAMES.REGISTRY_SPACE]: EDPConfigMap?.data?.container_registry_space,
    [REGISTRY_NAMES.PUSH_ACCOUNT_USER]: pushUserName,
    [REGISTRY_NAMES.PUSH_ACCOUNT_PASSWORD]: pushPassword,
    [REGISTRY_NAMES.PULL_ACCOUNT_USER]: pullUserName,
    [REGISTRY_NAMES.PULL_ACCOUNT_PASSWORD]: pullPassword,
    [REGISTRY_NAMES.USE_SAME_ACCOUNT]: !pullUserName && !pullPassword,
  };
};

const handleOpenshift = (
  EDPConfigMap: ConfigMapKubeObjectInterface,
  pushAccountSecret: SecretKubeObjectInterface
) => {
  const { auth } = getAuth(pushAccountSecret);

  return {
    [REGISTRY_NAMES.REGISTRY_TYPE]: EDPConfigMap?.data?.container_registry_type,
    [REGISTRY_NAMES.REGISTRY_HOST]: EDPConfigMap?.data?.container_registry_host,
    [REGISTRY_NAMES.REGISTRY_SPACE]: EDPConfigMap?.data?.container_registry_space,
    [REGISTRY_NAMES.PUSH_ACCOUNT_PASSWORD]: auth,
  };
};

export const useDefaultValues = ({ formData }: { formData: ManageRegistryDataContext }) => {
  const { EDPConfigMap, tektonServiceAccount, pushAccountSecret, pullAccountSecret } = formData;

  if (!EDPConfigMap?.data?.container_registry_type) {
    return {};
  }

  switch (EDPConfigMap.data.container_registry_type) {
    case CONTAINER_REGISTRY_TYPE.ECR:
      return handleECR(EDPConfigMap, tektonServiceAccount);
    case CONTAINER_REGISTRY_TYPE.DOCKER_HUB:
    case CONTAINER_REGISTRY_TYPE.HARBOR:
    case CONTAINER_REGISTRY_TYPE.NEXUS:
      return handleDockerHubOrHarborOrNexus(EDPConfigMap, pushAccountSecret, pullAccountSecret);
    case CONTAINER_REGISTRY_TYPE.OPENSHIFT_REGISTRY:
      return handleOpenshift(EDPConfigMap, pushAccountSecret);
    default:
      break;
  }
};
