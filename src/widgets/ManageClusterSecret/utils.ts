import { SECRET_LABEL_CLUSTER_TYPE } from '../../k8s/groups/default/Secret/labels';
import { SecretKubeObjectInterface } from '../../k8s/groups/default/Secret/types';
import { safeDecode } from '../../utils/decodeEncode';
import { CLUSTER_TYPE } from './constants';

const parseConfigJson = (configJson: string) => {
  const decodedConfigJson = safeDecode(configJson);
  return decodedConfigJson ? JSON.parse(decodedConfigJson) : {};
};

export const getClusterName = (secret: SecretKubeObjectInterface): string => {
  const clusterType = secret.metadata?.labels?.[SECRET_LABEL_CLUSTER_TYPE] ?? CLUSTER_TYPE.BEARER;
  const config = parseConfigJson(secret.data?.config);

  if (clusterType === CLUSTER_TYPE.BEARER) {
    return config?.clusters[0]?.name;
  }

  return safeDecode(secret.data.name) ?? '';
};
