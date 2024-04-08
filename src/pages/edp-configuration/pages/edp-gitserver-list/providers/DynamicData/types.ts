import { EDPGitServerKubeObjectInterface } from '../../../../../../k8s/EDPGitServer/types';
import { SecretKubeObjectInterface } from '../../../../../../k8s/Secret/types';
import { DataProviderValue } from '../../../../../../types/pages';

export interface DynamicDataContextProviderValue {
  gitServers: DataProviderValue<EDPGitServerKubeObjectInterface[]>;
  repositorySecrets: DataProviderValue<SecretKubeObjectInterface[]>;
}
