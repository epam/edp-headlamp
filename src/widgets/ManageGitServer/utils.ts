import { GitProvider } from '../../constants/gitProviders';
import { SecretKubeObjectInterface } from '../../k8s/groups/default/Secret/types';
import { GitServerKubeObjectInterface } from '../../k8s/groups/EDP/GitServer/types';
import { createGitServerSecretName } from '../../k8s/groups/EDP/GitServer/utils/createGitServerInstance';

export const getGitServerSecret = (
  gitServer: GitServerKubeObjectInterface | undefined,
  repositorySecrets: SecretKubeObjectInterface[],
  gitServerProviderFieldValue: string
) => {
  const gitServerProvider = gitServer?.spec.gitProvider || gitServerProviderFieldValue;

  const gitServerSecretToFindName = createGitServerSecretName(gitServerProvider as GitProvider);

  return repositorySecrets.find((secret) => secret.metadata.name === gitServerSecretToFindName)
    ?.jsonData;
};
