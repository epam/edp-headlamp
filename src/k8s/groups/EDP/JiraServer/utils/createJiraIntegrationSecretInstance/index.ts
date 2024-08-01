import { safeEncode } from '../../../../../../utils/decodeEncode';
import { INTEGRATION_SECRET_NAMES } from '../../../../default/Secret/constants';
import {
  SECRET_LABEL_INTEGRATION_SECRET,
  SECRET_LABEL_SECRET_TYPE,
} from '../../../../default/Secret/labels';
import { SecretKubeObjectInterface } from '../../../../default/Secret/types';

export const createJiraIntegrationSecretInstance = ({
  username,
  password,
}: {
  username: string;
  password: string;
}): SecretKubeObjectInterface => {
  return {
    apiVersion: 'v1',
    kind: 'Secret',
    // @ts-ignore
    metadata: {
      name: INTEGRATION_SECRET_NAMES.JIRA,
      labels: {
        [SECRET_LABEL_SECRET_TYPE]: 'jira',
        [SECRET_LABEL_INTEGRATION_SECRET]: 'true',
      },
    },
    type: 'Opaque',
    data: {
      username: safeEncode(username),
      password: safeEncode(password),
    },
  };
};
