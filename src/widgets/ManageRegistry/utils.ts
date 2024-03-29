import { SecretKubeObjectInterface } from '../../k8s/Secret/types';
import { safeDecode } from '../../utils/decodeEncode';

export const parseConfigJson = (configJson: string) => {
  const decodedConfigJson = safeDecode(configJson);
  return JSON.parse(decodedConfigJson);
};

export const getUsernameAndPassword = (
  secret: SecretKubeObjectInterface
): { userName: string | undefined; password: string | undefined } => {
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

export const getAuth = (secret: SecretKubeObjectInterface) => {
  if (!secret) {
    return { auth: undefined };
  }

  const configJson = secret?.data?.['.dockerconfigjson'];
  const parsedConfigJson = parseConfigJson(configJson);
  // @ts-ignore
  const auth = Object.values(parsedConfigJson.auths)[0]?.auth;
  return { auth };
};
