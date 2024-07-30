import { GIT_PROVIDERS } from '../../constants/gitProviders';
import { SecretKubeObjectInterface } from '../../k8s/groups/default/Secret/types';
import { GitServerKubeObjectInterface } from '../../k8s/groups/EDP/GitServer/types';
import { createGitServerSecretName } from '../../k8s/groups/EDP/GitServer/utils/createGitServerInstance';
import { ValueOf } from '../../types/global';

export const getGitServerSecret = (
  gitServer: GitServerKubeObjectInterface | undefined,
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
