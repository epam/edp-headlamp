import { DeepPartial } from '../../../../../../types/global';
import { EDPKubeObjectInterface } from '../../../../../../types/k8s';
import { safeEncode } from '../../../../../../utils/decodeEncode';

export const createCodebaseSecretInstance = ({
  codebaseName,
  repositoryLogin,
  repositoryPassword,
}: {
  codebaseName: string;
  repositoryLogin: string;
  repositoryPassword: string;
}): DeepPartial<EDPKubeObjectInterface> => {
  return {
    apiVersion: 'v1',
    kind: 'Secret',
    metadata: {
      name: `repository-codebase-${codebaseName}-temp`,
    },
    data: {
      username: safeEncode(repositoryLogin),
      password: safeEncode(repositoryPassword),
    },
  };
};
