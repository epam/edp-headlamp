import { EDPGitServerKubeObjectInterface } from '../../../../../../k8s/EDPGitServer/types';
import { SecretKubeObjectInterface } from '../../../../../../k8s/Secret/types';

export interface DynamicDataContextProviderValue {
  data: {
    gitServers: EDPGitServerKubeObjectInterface[];
    repositorySecrets: SecretKubeObjectInterface[];
  };
  isLoading: boolean;
}
