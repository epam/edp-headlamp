import { GIT_PROVIDERS } from '../../../constants/gitProviders';
import { EDPGitServerKubeObjectInterface } from '../../../k8s/EDPGitServer/types';
import { createGitServerSecretName } from '../../../k8s/EDPGitServer/utils/createGitServerInstance';
import { SecretKubeObjectInterface } from '../../../k8s/Secret/types';
import { ValueOf } from '../../../types/global';

export const getGitServerSecret = (
  gitServer: EDPGitServerKubeObjectInterface | undefined,
  repositorySecrets: SecretKubeObjectInterface[],
  gitServerProviderFieldValue: string
) => {
  const gitServerProvider = gitServer?.spec.gitProvider || gitServerProviderFieldValue;

  const gitServerSecretToFindName = createGitServerSecretName(
    gitServerProvider as ValueOf<typeof GIT_PROVIDERS>
  );

  return repositorySecrets.find((secret) => secret.metadata.name === gitServerSecretToFindName)
    ?.jsonData;
};
